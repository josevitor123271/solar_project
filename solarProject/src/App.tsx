// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage';

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

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<RegistrationPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/pessoa-fisica" element={<PessoaFisica />} />
          <Route path="/pessoa-juridica" element={<PessoaJuridica />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}