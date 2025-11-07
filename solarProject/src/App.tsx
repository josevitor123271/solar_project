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

export default function App() {
  return (
    <Router>
      <div className="min-h-screen text-center bg-white">
        <header className="flex items-center justify-center py-6 bg-black">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              SolarProject
            </h1>
            <p className="mt-2 text-lg font-medium text-gray-400">
              Energia limpa para um futuro inteligente
            </p>
          </div>
        </header>

        <main className="w-full">
          <Routes>
            <Route path="/" element={<RegistrationPage />} />
            <Route path="/pessoa-fisica" element={<PessoaFisica />} />
            <Route path="/pessoa-juridica" element={<PessoaJuridica />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}