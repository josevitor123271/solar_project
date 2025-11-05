// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-linear-to-br from-teal-50 to-emerald-50">
        <header className="text-center py-6">
          <h1 className="text-4xl md:text-5xl font-bold text-green-900 tracking-tight">
            SolarProject
          </h1>
          <p className="mt-2 text-lg text-green-700 font-medium">
            Energia limpa para um futuro inteligente
          </p>
        </header>

        <main className="flex justify-center px-4 pb-12">
          <Routes>
            <Route path="/" element={<RegistrationPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}