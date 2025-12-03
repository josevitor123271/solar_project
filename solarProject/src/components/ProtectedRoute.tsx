import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import type { ReactElement } from 'react';

export default function ProtectedRoute({ children }: { children: ReactElement }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Se não estiver autenticado, redireciona para a página de aviso
    if (!isAuthenticated) {
      navigate('/warning');
    }
  }, [isAuthenticated, navigate]);

  // Se estiver autenticado, renderiza os filhos, senão retorna null enquanto redireciona
  return isAuthenticated ? children : null;
}