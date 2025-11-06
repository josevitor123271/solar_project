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

export default function App() {
  return (
    <Router>
      <div className="min-h-screen text-center" style={{ backgroundColor: '#FEFAE0' }}>
        <header className="flex items-center justify-center py-6" style={{ backgroundColor: '#0A400C' }}>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: '#B1AB86' }}>
              SolarProject
            </h1>
            <p className="mt-2 text-lg font-medium" style={{ color: '#819067' }}>
              Energia limpa para um futuro inteligente
            </p>
          </div>
        </header>

        <main className="w-full">
          <Routes>
            <Route path="/" element={<RegistrationPage />} />
            <Route path="/pessoa-fisica" element={<PessoaFisica />} />
            <Route path="/pessoa-juridica" element={<PessoaJuridica />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}