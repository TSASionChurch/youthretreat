import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import History from './pages/History';
import Ministries from './pages/Ministries';
import Youth from './pages/Youth';
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import Retreat from './pages/Retreat';
import Register from './pages/Register';
import Confirmation from './pages/Confirmation';
import {
  SAYYouthPage,
  JuniorHomeLeaguePage,
  HomeLeaguePage,
  ChildrensMinistriesPage,
  MedicalFellowshipPage,
  SundayWorshipPage,
} from './pages/MinistryPages';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Main Church Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/ministries" element={<Ministries />} />
          <Route path="/youth" element={<Youth />} />

          {/* Ministry Sub-Pages */}
          <Route path="/ministries/say-youth" element={<SAYYouthPage />} />
          <Route path="/ministries/junior-home-league" element={<JuniorHomeLeaguePage />} />
          <Route path="/ministries/home-league" element={<HomeLeaguePage />} />
          <Route path="/ministries/childrens-ministries" element={<ChildrensMinistriesPage />} />
          <Route path="/ministries/medical-fellowship" element={<MedicalFellowshipPage />} />
          <Route path="/ministries/sunday-worship" element={<SundayWorshipPage />} />

          {/* Blog → SAY Youth */}
          <Route path="/blog" element={<Navigate to="/ministries/say-youth" replace />} />

          <Route path="/donate" element={<Donate />} />
          <Route path="/contact" element={<Contact />} />

          {/* Event Landing and Registration Pages */}
          <Route path="/retreat" element={<Retreat />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirmation" element={<Confirmation />} />

          {/* Catch-all Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
