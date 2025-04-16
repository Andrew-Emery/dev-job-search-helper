import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './providers/ThemeProvider'
import { Navigation } from './components/Navigation/Navigation'
import { Footer } from './components/Footer/Footer'
import { HomePage } from './pages/HomePage'
import { QuestionsPage } from './pages/QuestionsPage'
import { ApplicationsPage } from './pages/ApplicationsPage'
import { SettingsPage } from './pages/SettingsPage'
import './App.css'

export const App = () => {
  return (
    <ThemeProvider>
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
      </BrowserRouter>
    </ThemeProvider>
  )
}

