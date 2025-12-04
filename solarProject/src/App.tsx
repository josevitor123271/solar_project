// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage';
import ProtectedRoute from './components/ProtectedRoute';

// Styles
import './App.css';

// Pages

// Pessoa Física
import PessoaFisica from './pages/PessoaFisica';

// Pessoa Jurídica
import PessoaJuridica from './pages/PessoaJuridica';

// Dashboard
import Dashboard from './pages/Dashboard';

// Home
import Home from './pages/Home';
import WarningPage from './pages/WarningPage';
import SettingsPage from './pages/SettingsPage';

// Auth Context
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-white">
          <Routes>
            <Route path="/" element={<RegistrationPage />} />
            <Route path="/home" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/pessoa-fisica" element={<PessoaFisica />} />
            <Route path="/pessoa-juridica" element={<PessoaJuridica />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/warning" element={<WarningPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}