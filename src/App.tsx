import './App.css';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';

import { Footer } from './components/Footer/Footer';
import { Navigation } from './components/Navigation/Navigation';
import { ToastContainer } from './components/Notifications/ToastContainer';
import { NotificationProvider } from './context/NotificationContext';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { HomePage } from './pages/HomePage';
import { QuestionsPage } from './pages/QuestionsPage';
import { SettingsPage } from './pages/SettingsPage';
import { ThemeProvider } from './providers/ThemeProvider';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CssBaseline />
      <NotificationProvider>
        <BrowserRouter>
          <div className="app-wrapper">
            <Navigation />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/questions" element={<QuestionsPage />} />
                <Route path="/applications" element={<ApplicationsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <ToastContainer />
        </BrowserRouter>
      </NotificationProvider>
    </ThemeProvider>
  );
};


