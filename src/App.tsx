import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

// ── Route-level code splitting ──────────────────────────────────────────────
// Each page is loaded only when the user navigates to it.
// This prevents the mobile browser from downloading all page code upfront.
const Home         = lazy(() => import('./pages/Home'));
const History      = lazy(() => import('./pages/History'));
const Ministries   = lazy(() => import('./pages/Ministries'));
const Youth        = lazy(() => import('./pages/Youth'));
const Donate       = lazy(() => import('./pages/Donate'));
const Contact      = lazy(() => import('./pages/Contact'));
const Retreat      = lazy(() => import('./pages/Retreat'));
const Register     = lazy(() => import('./pages/Register'));
const Confirmation = lazy(() => import('./pages/Confirmation'));

const MinistryPages = lazy(() =>
  import('./pages/MinistryPages').then(m => ({
    default: () => null, // placeholder — individual exports used below
  }))
);

const SAYYouthPage            = lazy(() => import('./pages/MinistryPages').then(m => ({ default: m.SAYYouthPage })));
const JuniorHomeLeaguePage    = lazy(() => import('./pages/MinistryPages').then(m => ({ default: m.JuniorHomeLeaguePage })));
const HomeLeaguePage          = lazy(() => import('./pages/MinistryPages').then(m => ({ default: m.HomeLeaguePage })));
const ChildrensMinistriesPage = lazy(() => import('./pages/MinistryPages').then(m => ({ default: m.ChildrensMinistriesPage })));
const MedicalFellowshipPage   = lazy(() => import('./pages/MinistryPages').then(m => ({ default: m.MedicalFellowshipPage })));
const SundayWorshipPage       = lazy(() => import('./pages/MinistryPages').then(m => ({ default: m.SundayWorshipPage })));

// Minimal spinner shown while a lazy chunk is being fetched
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-8 h-8 rounded-full border-4 border-[#D92B27] border-t-transparent animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Main Church Pages */}
            <Route path="/"          element={<Home />} />
            <Route path="/history"   element={<History />} />
            <Route path="/ministries" element={<Ministries />} />
            <Route path="/youth"     element={<Youth />} />

            {/* Ministry Sub-Pages */}
            <Route path="/ministries/say-youth"            element={<SAYYouthPage />} />
            <Route path="/ministries/junior-home-league"   element={<JuniorHomeLeaguePage />} />
            <Route path="/ministries/home-league"          element={<HomeLeaguePage />} />
            <Route path="/ministries/childrens-ministries" element={<ChildrensMinistriesPage />} />
            <Route path="/ministries/medical-fellowship"   element={<MedicalFellowshipPage />} />
            <Route path="/ministries/sunday-worship"       element={<SundayWorshipPage />} />

            {/* Blog → SAY Youth */}
            <Route path="/blog" element={<Navigate to="/ministries/say-youth" replace />} />

            <Route path="/donate"       element={<Donate />} />
            <Route path="/contact"      element={<Contact />} />

            {/* Event Landing and Registration Pages */}
            <Route path="/retreat"      element={<Retreat />} />
            <Route path="/register"     element={<Register />} />
            <Route path="/confirmation" element={<Confirmation />} />

            {/* Catch-all Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
