import './App.css';

import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';

import { Footer } from './components/Footer/Footer';
import { Navigation } from './components/Navigation/Navigation';
import { ToastContainer } from './components/Notifications/ToastContainer';
import { NotificationProvider } from './context/NotificationContext';
import { ThemeProvider } from './providers/ThemeProvider';

// Lazy load pages
const HomePage = React.lazy(() => import('./pages/HomePage'));
const QuestionsPage = React.lazy(() => import('./pages/QuestionsPage'));
const ApplicationsPage = React.lazy(() => import('./pages/ApplicationsPage'));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage'));

// Loading fallback component
const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </div>
);

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CssBaseline />
      <NotificationProvider>
        <BrowserRouter>
          <div className="app-wrapper">
            <Navigation />
            <main className="main-content">
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/questions" element={<QuestionsPage />} />
                  <Route path="/applications" element={<ApplicationsPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
          <ToastContainer />
        </BrowserRouter>
      </NotificationProvider>
    </ThemeProvider>
  );
};


