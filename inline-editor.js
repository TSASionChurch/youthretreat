/**
 * TSA Sion – Frontend Inline Editor
 * Only activates when WordPress admin is logged in.
 * Adds an "Edit Mode" toggle so admins can click text to edit it inline.
 */
(function () {
  'use strict';

  // Only run for logged-in admins (WP adds 'logged-in' to body)
  if (!document.body.classList.contains('logged-in')) return;

  var CFG      = window.tsasionInlineEdit || {};
  var NONCE    = CFG.nonce   || '';
  var AJAX_URL = CFG.ajaxUrl || '/wp-admin/admin-ajax.php';
  var POST_ID  = CFG.postId  || 0;
  var isAdmin  = CFG.isAdmin || false;
  if (!isAdmin) return;

  var editMode       = false;
  var changedFields  = {};
  var originalValues = {};

  /* ── Inject CSS ──────────────────────────────────────── */
  var style = document.createElement('style');
  style.textContent = `
    [data-tsasion-field][contenteditable="true"]:focus {
      outline: 2px solid #222d61 !important;
      background: rgba(34,45,97,0.06) !important;
      border-radius: 2px;
    }
    [data-tsasion-field][data-changed="1"] {
      outline: 2px solid #f59e0b !important;
      background: rgba(245,158,11,0.06) !important;
    }
    #tsa-edit-toggle:hover { transform: scale(1.05); }
    #tsa-save-btn:hover    { background: #b91c1c !important; }
    #tsa-cancel-btn:hover  { background: rgba(255,255,255,0.1) !important; }
  `;
  document.head.appendChild(style);

  /* ── Floating toggle button ──────────────────────────── */
  var toggleBtn = document.createElement('button');
  toggleBtn.id = 'tsa-edit-toggle';
  toggleBtn.textContent = '✏ Edit Mode';
  toggleBtn.setAttribute('aria-label', 'Toggle frontend edit mode');
  toggleBtn.style.cssText = [
    'position:fixed', 'bottom:80px', 'right:24px', 'z-index:99999',
    'background:#222d61', 'color:#fff', 'border:none',
    'padding:10px 18px', 'border-radius:9999px',
    'font-size:11px', 'font-weight:700', 'letter-spacing:0.12em',
    'cursor:pointer', 'box-shadow:0 8px 32px rgba(0,0,0,0.35)',
    'transition:all 0.25s', 'font-family:monospace', 'text-transform:uppercase',
  ].join(';');
  document.body.appendChild(toggleBtn);

  /* ── Bottom save bar ─────────────────────────────────── */
  var saveBar = document.createElement('div');
  saveBar.id = 'tsa-save-bar';
  saveBar.style.cssText = [
    'position:fixed', 'bottom:0', 'left:0', 'right:0', 'z-index:100000',
    'background:#0f172a', 'border-top:2px solid #FFE600',
    'padding:12px 28px', 'display:none', 'align-items:center',
    'justify-content:space-between', 'gap:16px',
    'box-shadow:0 -8px 40px rgba(0,0,0,0.6)', 'flex-wrap:wrap',
  ].join(';');
  saveBar.innerHTML = `
    <span style="color:#FFE600;font-family:monospace;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;">
      ✏ Edit Mode — Click any highlighted text to edit
    </span>
    <div style="display:flex;gap:10px;flex-shrink:0;">
      <button id="tsa-save-btn"   style="background:#D92B27;color:#fff;border:none;padding:9px 22px;border-radius:6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;cursor:pointer;transition:background 0.2s;">Save Changes</button>
      <button id="tsa-cancel-btn" style="background:transparent;color:rgba(255,255,255,0.6);border:1px solid rgba(255,255,255,0.25);padding:9px 22px;border-radius:6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;cursor:pointer;transition:background 0.2s;">Cancel</button>
    </div>`;
  document.body.appendChild(saveBar);

  /* ── Toast notification ──────────────────────────────── */
  var toast = document.createElement('div');
  toast.id = 'tsa-toast';
  toast.style.cssText = [
    'position:fixed', 'top:80px', 'right:24px', 'z-index:100001',
    'padding:12px 22px', 'border-radius:8px',
    'font-size:13px', 'font-weight:600', 'font-family:monospace',
    'opacity:0', 'transition:opacity 0.3s', 'pointer-events:none',
    'box-shadow:0 8px 24px rgba(0,0,0,0.3)',
  ].join(';');
  document.body.appendChild(toast);

  function showToast(msg, isError) {
    toast.textContent = msg;
    toast.style.background = isError ? '#D92B27' : '#16a34a';
    toast.style.color = '#fff';
    toast.style.opacity = '1';
    setTimeout(function () { toast.style.opacity = '0'; }, 3500);
  }

  function getEditableFields() {
    return Array.from(document.querySelectorAll('[data-tsasion-field]'));
  }

  /* ── Enable edit mode ────────────────────────────────── */
  function enableEditMode() {
    editMode = true;
    changedFields = {};

    toggleBtn.textContent = '✏ Editing…';
    toggleBtn.style.background = '#FFE600';
    toggleBtn.style.color      = '#222d61';

    saveBar.style.display = 'flex';

    getEditableFields().forEach(function (el) {
      var field = el.dataset.tsasionField;
      originalValues[field] = el.innerText.trim();

      el.setAttribute('contenteditable', 'true');
      el.style.outline       = '2px dashed rgba(34,45,97,0.35)';
      el.style.outlineOffset = '3px';
      el.style.cursor        = 'text';
      el.style.borderRadius  = '2px';
      el.style.transition    = 'outline 0.2s, background 0.2s';

      el.addEventListener('input', onInput);
      el.addEventListener('blur', onBlur);
      el.addEventListener('keydown', onKeydown);
    });
  }

  function onInput() {
    /* handled in onBlur for cleanliness */
  }

  function onBlur() {
    var el    = this;
    var field = el.dataset.tsasionField;
    var val   = el.innerText.trim();

    if (val !== originalValues[field]) {
      changedFields[field] = {
        value:  val,
        type:   el.dataset.tsasionType   || 'meta',
        postId: el.dataset.tsasionPost   || POST_ID,
      };
      el.setAttribute('data-changed', '1');
    } else {
      delete changedFields[field];
      el.removeAttribute('data-changed');
      el.style.outline = '2px dashed rgba(34,45,97,0.35)';
    }
  }

  function onKeydown(e) {
    // Enter = commit (except in block-level text)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.blur();
    }
    // Escape = revert this field
    if (e.key === 'Escape') {
      var field = this.dataset.tsasionField;
      this.innerText = originalValues[field] || '';
      delete changedFields[field];
      this.removeAttribute('data-changed');
      this.blur();
    }
  }

  /* ── Disable edit mode ───────────────────────────────── */
  function disableEditMode(revert) {
    editMode = true; // keep flag to avoid double-disable
    changedFields = {};

    toggleBtn.textContent    = '✏ Edit Mode';
    toggleBtn.style.background = '#222d61';
    toggleBtn.style.color    = '#fff';
    saveBar.style.display    = 'none';

    getEditableFields().forEach(function (el) {
      var field = el.dataset.tsasionField;
      el.removeAttribute('contenteditable');
      el.removeAttribute('data-changed');
      el.style.outline       = '';
      el.style.outlineOffset = '';
      el.style.cursor        = '';
      el.style.background    = '';
      el.style.borderRadius  = '';
      el.removeEventListener('input',   onInput);
      el.removeEventListener('blur',    onBlur);
      el.removeEventListener('keydown', onKeydown);

      if (revert && originalValues[field] !== undefined) {
        el.innerText = originalValues[field];
      }
    });
    editMode = false;
  }

  /* ── Save all changed fields via AJAX ────────────────── */
  function saveChanges() {
    var keys = Object.keys(changedFields);
    if (!keys.length) {
      showToast('No changes to save.', false);
      disableEditMode(false);
      return;
    }

    var saveBtn = document.getElementById('tsa-save-btn');
    saveBtn.textContent = 'Saving…';
    saveBtn.disabled    = true;

    var body = new URLSearchParams();
    body.append('action',  'tsasion_inline_save');
    body.append('nonce',   NONCE);
    body.append('post_id', POST_ID);
    body.append('fields',  JSON.stringify(changedFields));

    fetch(AJAX_URL, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data.success) {
          showToast('✅ ' + keys.length + ' change(s) saved!', false);
          keys.forEach(function (k) { originalValues[k] = changedFields[k].value; });
          changedFields = {};
          disableEditMode(false);
        } else {
          showToast('❌ ' + (data.data || 'Could not save'), true);
        }
      })
      .catch(function () { showToast('❌ Network error. Try again.', true); })
      .finally(function () {
        saveBtn.textContent = 'Save Changes';
        saveBtn.disabled    = false;
      });
  }

  /* ── Event listeners ─────────────────────────────────── */
  toggleBtn.addEventListener('click', function () {
    if (editMode) { disableEditMode(false); } else { enableEditMode(); }
  });

  document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'tsa-save-btn')   saveChanges();
    if (e.target && e.target.id === 'tsa-cancel-btn') disableEditMode(true);
  });

})();
