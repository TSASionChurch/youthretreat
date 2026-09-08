<?php
if (!defined('ABSPATH')) exit;

/* ──────────────────────────────────────────
   1. THEME SETUP
────────────────────────────────────────── */
function tsasion_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('align-wide');
    add_theme_support('wp-block-styles');
    add_theme_support('responsive-embeds');
    add_theme_support('editor-styles');
    add_editor_style('style.css');
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'tsasion'),
        'footer'  => __('Footer Menu', 'tsasion'),
    ));
}
add_action('after_setup_theme', 'tsasion_setup');

/* ──────────────────────────────────────────
   2. ENQUEUE SCRIPTS & STYLES
────────────────────────────────────────── */
function tsasion_enqueue_scripts() {
    wp_enqueue_script('tailwind-cdn', 'https://cdn.tailwindcss.com', array(), null, false);
    wp_enqueue_style('tsasion-google-fonts', 'https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400..800;1,400..800&family=Inter+Tight:ital,wght@0,300..900;1,300..900&family=Oswald:wght@400;600;700&family=Space+Grotesk:wght@400;500;700&display=swap', array(), null);
    wp_enqueue_style('tsasion-style', get_stylesheet_uri(), array(), '1.0.3');
    wp_enqueue_script('tsasion-main',     get_template_directory_uri() . '/assets/js/main.js',     array(), '1.0.0', true);
    wp_enqueue_script('tsasion-timer',    get_template_directory_uri() . '/assets/js/timer.js',    array(), '1.0.0', true);
    wp_enqueue_script('tsasion-carousel', get_template_directory_uri() . '/assets/js/carousel.js', array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'tsasion_enqueue_scripts');

/* ──────────────────────────────────────────
   3. AUTO-CREATE ALL 15 PAGES IN DB
────────────────────────────────────────── */
function tsasion_auto_create_pages() {
    if (get_option('tsasion_pages_created_v3')) return;

    $top_pages = array(
        'history'      => array('title' => 'History',      'template' => 'page-history.php'),
        'ministries'   => array('title' => 'Ministries',   'template' => 'page-ministries.php'),
        'retreat'      => array('title' => 'Retreat 26',   'template' => 'page-retreat.php'),
        'contact'      => array('title' => 'Contact',      'template' => 'page-contact.php'),
        'donate'       => array('title' => 'Support',      'template' => 'page-donate.php'),
        'register'     => array('title' => 'Register',     'template' => 'page-register.php'),
        'confirmation' => array('title' => 'Confirmation', 'template' => 'page-confirmation.php'),
        'youth'        => array('title' => 'Youth',        'template' => 'page-youth.php'),
    );

    $sub_pages = array(
        'say-youth'            => array('title' => 'SAY Youth Group',       'template' => 'page-say-youth.php'),
        'junior-home-league'   => array('title' => 'Junior Home League',    'template' => 'page-junior-home-league.php'),
        'home-league'          => array('title' => 'Home League Women',     'template' => 'page-home-league.php'),
        'childrens-ministries' => array('title' => "Children's Ministries", 'template' => 'page-childrens-ministries.php'),
        'media-ministry'       => array('title' => 'Media Ministry',        'template' => 'page-media-ministry.php'),
        'medical-fellowship'   => array('title' => 'Medical Fellowship',    'template' => 'page-medical-fellowship.php'),
        'sunday-worship'       => array('title' => 'Sunday Worship',        'template' => 'page-sunday-worship.php'),
    );

    foreach ($top_pages as $slug => $data) {
        $existing = get_page_by_path($slug);
        if (!$existing) {
            $pid = wp_insert_post(array('post_title' => $data['title'], 'post_name' => $slug, 'post_status' => 'publish', 'post_type' => 'page', 'comment_status' => 'closed'));
            if ($pid && !is_wp_error($pid)) update_post_meta($pid, '_wp_page_template', $data['template']);
        } else {
            update_post_meta($existing->ID, '_wp_page_template', $data['template']);
        }
    }

    $min_page = get_page_by_path('ministries');
    $min_id   = $min_page ? $min_page->ID : 0;

    foreach ($sub_pages as $slug => $data) {
        $existing = get_page_by_path($slug) ?: get_page_by_path('ministries/' . $slug);
        if (!$existing) {
            $pid = wp_insert_post(array('post_title' => $data['title'], 'post_name' => $slug, 'post_status' => 'publish', 'post_type' => 'page', 'post_parent' => $min_id, 'comment_status' => 'closed'));
            if ($pid && !is_wp_error($pid)) update_post_meta($pid, '_wp_page_template', $data['template']);
        } else {
            update_post_meta($existing->ID, '_wp_page_template', $data['template']);
        }
    }
    update_option('tsasion_pages_created_v3', true);
}
add_action('init', 'tsasion_auto_create_pages');

/* ──────────────────────────────────────────
   4. BLOCK PATTERN CATEGORY
────────────────────────────────────────── */
function tsasion_register_pattern_categories() {
    if (function_exists('register_block_pattern_category')) {
        register_block_pattern_category('tsasion', array('label' => __('TSA Sion Components', 'tsasion')));
    }
}
add_action('init', 'tsasion_register_pattern_categories');

/* ──────────────────────────────────────────
   5. EVENT TIMER SHORTCODE
────────────────────────────────────────── */
function tsasion_event_timer_shortcode($atts) {
    ob_start();
    ?>
    <div class="tsa-timer-wrapper bg-[#182046] text-white p-6 rounded-2xl border border-white/10 shadow-2xl max-w-xl mx-auto my-6">
        <div class="text-center mb-4">
            <span class="font-tech text-xs font-bold text-[#FFE600] uppercase tracking-widest">// COUNTDOWN TO YOUTH RETREAT 2026</span>
        </div>
        <div class="grid grid-cols-4 gap-3 text-center">
            <div class="bg-white/5 p-3 rounded-xl border border-white/10">
                <span id="tsa-days" class="tsa-days font-display text-3xl md:text-4xl text-[#FFE600] font-bold block">00</span>
                <span class="font-tech text-[10px] text-slate-400 uppercase tracking-widest">Days</span>
            </div>
            <div class="bg-white/5 p-3 rounded-xl border border-white/10">
                <span id="tsa-hours" class="tsa-hours font-display text-3xl md:text-4xl text-[#FFE600] font-bold block">00</span>
                <span class="font-tech text-[10px] text-slate-400 uppercase tracking-widest">Hours</span>
            </div>
            <div class="bg-white/5 p-3 rounded-xl border border-white/10">
                <span id="tsa-minutes" class="tsa-minutes font-display text-3xl md:text-4xl text-[#FFE600] font-bold block">00</span>
                <span class="font-tech text-[10px] text-slate-400 uppercase tracking-widest">Mins</span>
            </div>
            <div class="bg-white/5 p-3 rounded-xl border border-white/10">
                <span id="tsa-seconds" class="tsa-seconds font-display text-3xl md:text-4xl text-[#D92B27] font-bold block">00</span>
                <span class="font-tech text-[10px] text-slate-400 uppercase tracking-widest">Secs</span>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('tsa_event_timer', 'tsasion_event_timer_shortcode');

/* ══════════════════════════════════════════
   6. WORDPRESS CUSTOMIZER — GLOBAL CONTENT
   Appearance → Customize
══════════════════════════════════════════ */
function tsasion_customize_register($wp_customize) {

    // ── Hero Carousel Slides ──────────────────
    $wp_customize->add_panel('tsasion_hero', array(
        'title'    => '🏠 Hero Carousel',
        'priority' => 10,
    ));

    foreach (array(1, 2) as $n) {
        $defaults = ($n === 1) ? array(
            'eyebrow'     => 'SION TAMIL CHURCH',
            'title'       => 'Welcome to our church',
            'description' => 'Serving Sion & Dharavi with faith, fellowship, and love for over 86 years.',
            'subtitle'    => 'A community focused on spiritual growth & dedicated service',
            'year'        => '1940 – 2026',
            'cta_text'    => 'Learn Our History',
            'cta_link'    => '/history',
        ) : array(
            'eyebrow'     => 'SAY YOUTH GROUP',
            'title'       => 'Youth Retreat 2026',
            'description' => 'Join us for three transformative days of prayer, outdoor workshops, and spiritual growth.',
            'subtitle'    => 'Empowering the next generation of Christian leaders',
            'year'        => 'ANNUAL EVENT',
            'cta_text'    => 'View Retreat Details',
            'cta_link'    => '/retreat',
        );

        $wp_customize->add_section("tsasion_hero_slide{$n}", array(
            'title' => "Hero Slide {$n}",
            'panel' => 'tsasion_hero',
        ));

        $fields = array(
            "tsasion_hero{$n}_eyebrow"     => array('label' => 'Eyebrow Tag (ALL CAPS)',  'type' => 'text',     'default' => $defaults['eyebrow']),
            "tsasion_hero{$n}_title"        => array('label' => 'Main Title',              'type' => 'text',     'default' => $defaults['title']),
            "tsasion_hero{$n}_description"  => array('label' => 'Description Paragraph',  'type' => 'textarea', 'default' => $defaults['description']),
            "tsasion_hero{$n}_subtitle"     => array('label' => 'Subtitle (bottom bar)',   'type' => 'text',     'default' => $defaults['subtitle']),
            "tsasion_hero{$n}_year"         => array('label' => 'Year / Event Tag',        'type' => 'text',     'default' => $defaults['year']),
            "tsasion_hero{$n}_cta_text"     => array('label' => 'CTA Button Text',         'type' => 'text',     'default' => $defaults['cta_text']),
            "tsasion_hero{$n}_cta_link"     => array('label' => 'CTA Button URL',          'type' => 'url',      'default' => $defaults['cta_link']),
            "tsasion_hero{$n}_image"        => array('label' => 'Background Image URL',    'type' => 'image',    'default' => ''),
        );

        foreach ($fields as $key => $cfg) {
            $wp_customize->add_setting($key, array('default' => $cfg['default'], 'sanitize_callback' => 'sanitize_text_field', 'transport' => 'refresh'));
            $control_args = array('label' => $cfg['label'], 'section' => "tsasion_hero_slide{$n}", 'settings' => $key);
            if ($cfg['type'] === 'image') {
                $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, $key, $control_args));
            } elseif ($cfg['type'] === 'textarea') {
                $control_args['type'] = 'textarea';
                $wp_customize->add_control($key, $control_args);
            } elseif ($cfg['type'] === 'url') {
                $control_args['type'] = 'url';
                $wp_customize->add_control($key, $control_args);
            } else {
                $wp_customize->add_control($key, $control_args);
            }
        }
    }

    // ── About / Stats ─────────────────────────
    $wp_customize->add_section('tsasion_stats', array('title' => '📊 About Stats', 'priority' => 20));
    $stats_defaults = array(
        array('tsasion_stat1_number', '85+', 'Stat 1 Number'), array('tsasion_stat1_label', 'YEARS SERVING', 'Stat 1 Label'),
        array('tsasion_stat2_number', '6',   'Stat 2 Number'), array('tsasion_stat2_label', 'MINISTRIES',   'Stat 2 Label'),
        array('tsasion_stat3_number', '52',  'Stat 3 Number'), array('tsasion_stat3_label', 'SUNDAYS A YEAR','Stat 3 Label'),
        array('tsasion_about_tagline', 'Est. 1940 in Sion, Mumbai', 'Corps Heritage Tagline'),
        array('tsasion_about_intro', 'A Tamil Salvation Army church serving Sion and Dharavi with faith, fellowship, and compassion for over 86 years.', 'Intro Paragraph'),
    );
    foreach ($stats_defaults as $s) {
        $wp_customize->add_setting($s[0], array('default' => $s[1], 'sanitize_callback' => 'sanitize_text_field', 'transport' => 'refresh'));
        $wp_customize->add_control($s[0], array('label' => $s[2], 'section' => 'tsasion_stats', 'type' => 'text'));
    }

    // ── Service Schedule ──────────────────────
    $wp_customize->add_section('tsasion_services', array('title' => '📅 Service Schedule', 'priority' => 30));
    $service_defaults = array(
        array('tsasion_svc1_day', 'SUNDAY', 'Service 1: Day'), array('tsasion_svc1_time', '10:15 AM – 12:30 PM', 'Service 1: Time'), array('tsasion_svc1_desc', 'Sunday Holiness Meeting — Tamil praise, preaching, prayer.', 'Service 1: Description'),
        array('tsasion_svc2_day', 'SUNDAY', 'Service 2: Day'), array('tsasion_svc2_time', '12:00 PM – 1:00 PM', 'Service 2: Time'), array('tsasion_svc2_desc', "Sunday School — Children's Bible classes.", 'Service 2: Description'),
        array('tsasion_svc3_day', 'FRIDAY', 'Service 3: Day'), array('tsasion_svc3_time', '11:00 AM – 12:30 PM', 'Service 3: Time'), array('tsasion_svc3_desc', 'Home League Fasting Prayer — Intercessory prayer for married women.', 'Service 3: Description'),
        array('tsasion_svc4_day', 'SATURDAY', 'Service 4: Day'), array('tsasion_svc4_time', '9:00 PM', 'Service 4: Time'), array('tsasion_svc4_desc', 'SAY Youth Prayer — Youth fellowship & intercession.', 'Service 4: Description'),
    );
    foreach ($service_defaults as $s) {
        $wp_customize->add_setting($s[0], array('default' => $s[1], 'sanitize_callback' => 'sanitize_text_field', 'transport' => 'refresh'));
        $wp_customize->add_control($s[0], array('label' => $s[2], 'section' => 'tsasion_services', 'type' => 'text'));
    }

    // ── Contact & Location ────────────────────
    $wp_customize->add_section('tsasion_contact', array('title' => '📍 Contact & Location', 'priority' => 40));
    $contact_defaults = array(
        array('tsasion_address', '6, First Floor, Plot No, 60 Feet Road, Opposite Manav Seva Sangh, Sion East, Mumbai 400022', 'Full Address'),
        array('tsasion_phone', '+91 22 2401 2345', 'Phone Number'),
        array('tsasion_email', 'tsasionchurch@gmail.com', 'Email Address'),
        array('tsasion_map_embed', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4233.320311454406!2d72.8571873112368!3d19.033723482087858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c92a7019f37d%3A0xbf05632e51e35ef6!2sSalvation%20Army%20Tamil%20Church%2C%20Women%20And%20Children%20Home!5e1!3m2!1sen!2sin!4v1787584878953!5m2!1sen!2sin', 'Google Maps Embed URL'),
        array('tsasion_maps_link', 'https://maps.app.goo.gl/FopB2t33gXKW2yux7', 'Google Maps Direct Link'),
    );
    foreach ($contact_defaults as $s) {
        $wp_customize->add_setting($s[0], array('default' => $s[1], 'sanitize_callback' => 'wp_kses_post', 'transport' => 'refresh'));
        $wp_customize->add_control($s[0], array('label' => $s[2], 'section' => 'tsasion_contact', 'type' => 'text'));
    }

    // ── Retreat Event Details ─────────────────
    $wp_customize->add_section('tsasion_retreat', array('title' => '⛺ Youth Retreat Details', 'priority' => 50));
    $retreat_defaults = array(
        array('tsasion_retreat_date',       'FRIDAY, OCT 02, 2026',         'Event Date (full text)'),
        array('tsasion_retreat_time',       '9:00 AM – 6:00 PM',            'Event Timings'),
        array('tsasion_retreat_venue',      'SALVATION ARMY TAMIL CHURCH SION', 'Venue Name'),
        array('tsasion_retreat_speaker',    'PASTOR GUEST SPEAKER',          'Keynote Speaker Name'),
        array('tsasion_retreat_officers',   'CAPT JEBERSON PAUL & CAPT MUTHUSELVI JEBERSON', 'Corps Officers (hosts)'),
        array('tsasion_retreat_countdown',  '2026-10-02T09:00:00',           'Countdown Target ISO Date'),
    );
    foreach ($retreat_defaults as $s) {
        $wp_customize->add_setting($s[0], array('default' => $s[1], 'sanitize_callback' => 'sanitize_text_field', 'transport' => 'refresh'));
        $wp_customize->add_control($s[0], array('label' => $s[2], 'section' => 'tsasion_retreat', 'type' => 'text'));
    }
}
add_action('customize_register', 'tsasion_customize_register');

/* ══════════════════════════════════════════
   7. PAGE EDITOR META BOXES
   Shown in Gutenberg sidebar when editing pages
══════════════════════════════════════════ */
function tsasion_add_meta_boxes() {
    // Ministry sub-page meta box
    $ministry_templates = array(
        'page-say-youth.php', 'page-junior-home-league.php', 'page-home-league.php',
        'page-childrens-ministries.php', 'page-media-ministry.php',
        'page-medical-fellowship.php', 'page-sunday-worship.php',
    );

    add_meta_box('tsasion_ministry_content', '✏️ Ministry Page Content', 'tsasion_render_ministry_meta_box', 'page', 'normal', 'high');
    add_meta_box('tsasion_ministry_pillars',  '📌 Focus Areas (6 Pillars)',  'tsasion_render_pillars_meta_box',   'page', 'normal', 'default');
    add_meta_box('tsasion_retreat_meta',      '⛺ Retreat Page Fields',      'tsasion_render_retreat_meta_box',   'page', 'normal', 'high');
    add_meta_box('tsasion_contact_meta',      '📍 Contact Page Fields',      'tsasion_render_contact_meta_box',   'page', 'normal', 'high');
}
add_action('add_meta_boxes', 'tsasion_add_meta_boxes');

// Helper: Only render meta box if page uses a specific template
function tsasion_is_template($post_id, $templates) {
    $tpl = get_post_meta($post_id, '_wp_page_template', true);
    return in_array($tpl, (array) $templates);
}

/* Ministry content meta box */
function tsasion_render_ministry_meta_box($post) {
    $ministry_templates = array('page-say-youth.php','page-junior-home-league.php','page-home-league.php','page-childrens-ministries.php','page-media-ministry.php','page-medical-fellowship.php','page-sunday-worship.php');
    if (!tsasion_is_template($post->ID, $ministry_templates)) {
        echo '<p style="color:#999;">Not a ministry page — this panel is unused here.</p>';
        return;
    }
    wp_nonce_field('tsasion_ministry_save', 'tsasion_ministry_nonce');

    $fields = array(
        array('_tsasion_badge',       'Ministry Badge (e.g. YOUTH MINISTRY)', 'text'),
        array('_tsasion_subtitle',    'Page Subtitle',                         'textarea'),
        array('_tsasion_about1',      'About Paragraph 1 (Bold lead)',         'textarea'),
        array('_tsasion_about2',      'About Paragraph 2',                     'textarea'),
        array('_tsasion_about3',      'About Paragraph 3 (optional)',          'textarea'),
        array('_tsasion_vision',      'Vision / Mission Text',                 'textarea'),
        array('_tsasion_join',        'How to Join Text',                      'textarea'),
        array('_tsasion_cta_subtitle','Bottom CTA Subtitle',                   'textarea'),
    );

    echo '<div style="display:grid;gap:12px;padding:8px 0;">';
    foreach ($fields as $f) {
        $val = get_post_meta($post->ID, $f[0], true);
        echo '<div>';
        echo '<label style="display:block;font-weight:600;margin-bottom:4px;">' . esc_html($f[1]) . '</label>';
        if ($f[2] === 'textarea') {
            echo '<textarea name="' . esc_attr($f[0]) . '" style="width:100%;min-height:80px;font-size:13px;border:1px solid #ccc;border-radius:4px;padding:8px;">' . esc_textarea($val) . '</textarea>';
        } else {
            echo '<input type="text" name="' . esc_attr($f[0]) . '" value="' . esc_attr($val) . '" style="width:100%;font-size:13px;border:1px solid #ccc;border-radius:4px;padding:8px;" />';
        }
        echo '</div>';
    }
    echo '</div>';
}

/* Pillars meta box */
function tsasion_render_pillars_meta_box($post) {
    $ministry_templates = array('page-say-youth.php','page-junior-home-league.php','page-home-league.php','page-childrens-ministries.php','page-media-ministry.php','page-medical-fellowship.php','page-sunday-worship.php');
    if (!tsasion_is_template($post->ID, $ministry_templates)) {
        echo '<p style="color:#999;">Not a ministry page — this panel is unused here.</p>';
        return;
    }
    echo '<div style="display:grid;gap:16px;padding:8px 0;">';
    for ($i = 1; $i <= 6; $i++) {
        $title = get_post_meta($post->ID, "_tsasion_pillar_{$i}_title", true);
        $desc  = get_post_meta($post->ID, "_tsasion_pillar_{$i}_desc",  true);
        echo '<div style="border:1px solid #e2e8f0;padding:12px;border-radius:6px;background:#f8fafc;">';
        echo '<p style="font-weight:700;margin:0 0 8px;color:#1e3a5f;">Focus Area ' . $i . '</p>';
        echo '<label style="display:block;font-size:12px;color:#555;margin-bottom:3px;">Title</label>';
        echo '<input type="text" name="_tsasion_pillar_' . $i . '_title" value="' . esc_attr($title) . '" style="width:100%;font-size:13px;border:1px solid #ccc;border-radius:4px;padding:6px;margin-bottom:8px;" />';
        echo '<label style="display:block;font-size:12px;color:#555;margin-bottom:3px;">Description</label>';
        echo '<textarea name="_tsasion_pillar_' . $i . '_desc" style="width:100%;min-height:60px;font-size:13px;border:1px solid #ccc;border-radius:4px;padding:6px;">' . esc_textarea($desc) . '</textarea>';
        echo '</div>';
    }
    echo '</div>';
}

/* Retreat meta box */
function tsasion_render_retreat_meta_box($post) {
    if (!tsasion_is_template($post->ID, 'page-retreat.php')) {
        echo '<p style="color:#999;">Not the Retreat page — this panel is unused here.</p>';
        return;
    }
    wp_nonce_field('tsasion_ministry_save', 'tsasion_ministry_nonce');
    $fields = array(
        array('_tsasion_retreat_date',      'Event Date (e.g. FRIDAY, OCT 02, 2026)',    'text'),
        array('_tsasion_retreat_time',      'Event Timings (e.g. 9:00 AM – 6:00 PM)',    'text'),
        array('_tsasion_retreat_venue',     'Venue Name',                                 'text'),
        array('_tsasion_retreat_address',   'Venue Address (multi-line)',                 'textarea'),
        array('_tsasion_retreat_speaker',   'Keynote Speaker Name',                      'text'),
        array('_tsasion_retreat_officers',  'Corps Officers / Hosts',                    'text'),
        array('_tsasion_retreat_partners',  'Participating Churches (comma separated)',   'textarea'),
        array('_tsasion_retreat_subtitle',  'Hero Subtitle Paragraph',                   'textarea'),
    );
    echo '<div style="display:grid;gap:12px;padding:8px 0;">';
    foreach ($fields as $f) {
        $val = get_post_meta($post->ID, $f[0], true);
        echo '<div>';
        echo '<label style="display:block;font-weight:600;margin-bottom:4px;">' . esc_html($f[1]) . '</label>';
        if ($f[2] === 'textarea') {
            echo '<textarea name="' . esc_attr($f[0]) . '" style="width:100%;min-height:70px;font-size:13px;border:1px solid #ccc;border-radius:4px;padding:8px;">' . esc_textarea($val) . '</textarea>';
        } else {
            echo '<input type="text" name="' . esc_attr($f[0]) . '" value="' . esc_attr($val) . '" style="width:100%;font-size:13px;border:1px solid #ccc;border-radius:4px;padding:8px;" />';
        }
        echo '</div>';
    }
    echo '</div>';
}

/* Contact meta box */
function tsasion_render_contact_meta_box($post) {
    if (!tsasion_is_template($post->ID, 'page-contact.php')) {
        echo '<p style="color:#999;">Not the Contact page — this panel is unused here.</p>';
        return;
    }
    wp_nonce_field('tsasion_ministry_save', 'tsasion_ministry_nonce');
    $fields = array(
        array('_tsasion_contact_address',   'Full Address',             'textarea'),
        array('_tsasion_contact_phone',     'Phone Number',             'text'),
        array('_tsasion_contact_email',     'Email Address',            'text'),
        array('_tsasion_contact_map_embed', 'Google Maps Embed URL',    'text'),
        array('_tsasion_contact_maps_link', 'Google Maps Direct Link',  'text'),
    );
    echo '<div style="display:grid;gap:12px;padding:8px 0;">';
    foreach ($fields as $f) {
        $val = get_post_meta($post->ID, $f[0], true);
        echo '<div>';
        echo '<label style="display:block;font-weight:600;margin-bottom:4px;">' . esc_html($f[1]) . '</label>';
        if ($f[2] === 'textarea') {
            echo '<textarea name="' . esc_attr($f[0]) . '" style="width:100%;min-height:70px;font-size:13px;border:1px solid #ccc;border-radius:4px;padding:8px;">' . esc_textarea($val) . '</textarea>';
        } else {
            echo '<input type="text" name="' . esc_attr($f[0]) . '" value="' . esc_attr($val) . '" style="width:100%;font-size:13px;border:1px solid #ccc;border-radius:4px;padding:8px;" />';
        }
        echo '</div>';
    }
    echo '</div>';
}

/* ──────────────────────────────────────────
   8. SAVE META BOX DATA
────────────────────────────────────────── */
function tsasion_save_meta($post_id) {
    if (!isset($_POST['tsasion_ministry_nonce']) || !wp_verify_nonce($_POST['tsasion_ministry_nonce'], 'tsasion_ministry_save')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    $all_keys = array(
        // Ministry content
        '_tsasion_badge', '_tsasion_subtitle',
        '_tsasion_about1', '_tsasion_about2', '_tsasion_about3',
        '_tsasion_vision', '_tsasion_join', '_tsasion_cta_subtitle',
        // Retreat
        '_tsasion_retreat_date', '_tsasion_retreat_time', '_tsasion_retreat_venue',
        '_tsasion_retreat_address', '_tsasion_retreat_speaker', '_tsasion_retreat_officers',
        '_tsasion_retreat_partners', '_tsasion_retreat_subtitle',
        // Contact
        '_tsasion_contact_address', '_tsasion_contact_phone', '_tsasion_contact_email',
        '_tsasion_contact_map_embed', '_tsasion_contact_maps_link',
    );

    foreach ($all_keys as $key) {
        if (isset($_POST[$key])) {
            update_post_meta($post_id, $key, sanitize_textarea_field($_POST[$key]));
        }
    }

    // Pillars
    for ($i = 1; $i <= 6; $i++) {
        $tk = "_tsasion_pillar_{$i}_title";
        $dk = "_tsasion_pillar_{$i}_desc";
        if (isset($_POST[$tk])) update_post_meta($post_id, $tk, sanitize_text_field($_POST[$tk]));
        if (isset($_POST[$dk])) update_post_meta($post_id, $dk, sanitize_textarea_field($_POST[$dk]));
    }
}
add_action('save_post', 'tsasion_save_meta');

/* ──────────────────────────────────────────
   9. ENQUEUE ADMIN STYLES FOR META BOXES
────────────────────────────────────────── */
function tsasion_admin_styles() {
    echo '<style>
    #tsasion_ministry_content .inside,
    #tsasion_ministry_pillars .inside,
    #tsasion_retreat_meta .inside,
    #tsasion_contact_meta .inside {
        padding: 0 12px 12px;
    }
    #tsasion_ministry_content h2.hndle,
    #tsasion_ministry_pillars h2.hndle,
    #tsasion_retreat_meta h2.hndle,
    #tsasion_contact_meta h2.hndle {
        background: #1e3a5f;
        color: #fff;
        font-size: 13px;
    }
    </style>';
}
add_action('admin_head', 'tsasion_admin_styles');
