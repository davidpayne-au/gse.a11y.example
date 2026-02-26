import { HashRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
      </HashRouter>
    </ThemeProvider>
  )
}
