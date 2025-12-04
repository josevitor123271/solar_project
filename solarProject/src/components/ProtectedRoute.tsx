import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import type { ReactElement } from 'react';

export default function ProtectedRoute({ children }: { children: ReactElement }) {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Se não estiver autenticado, redireciona para a página de aviso
    if (!isAuthenticated && !loading) {
      navigate('/warning');
    }
  }, [isAuthenticated, loading, navigate]);

  // Mostra um spinner enquanto carrega
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  // Se estiver autenticado, renderiza os filhos, senão retorna null enquanto redireciona
  return isAuthenticated ? children : null;
}