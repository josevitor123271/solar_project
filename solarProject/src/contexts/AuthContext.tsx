import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../services/api';
import type { UserData as APIData } from '../services/api';
import type { ReactNode } from 'react';

interface UserData {
  name: string;
  email: string;
  cpf: string;
  accountType: 'Pessoa Física' | 'Pessoa Jurídica';
}

interface AuthContextType {
  isAuthenticated: boolean;
  userData: UserData | null;
  setIsAuthenticated: (value: boolean) => void;
  setUserData: (data: UserData) => void;
  logout: () => void;
  loading: boolean;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Verifica se o usuário já está autenticado ao carregar o app
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      const registered = localStorage.getItem('userRegistered');
      
      if (registered === 'true') {
        setIsAuthenticated(true);
        // Tentar buscar dados do usuário do localStorage primeiro
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
          try {
            setUserData(JSON.parse(storedUserData));
          } catch (e) {
            console.error('Erro ao parsear dados do usuário:', e);
          }
        }
        
        // Tentar atualizar dados do usuário do backend
        try {
          await fetchUserData();
        } catch (error) {
          console.warn('Não foi possível atualizar dados do usuário do backend:', error);
          // Mesmo que não consiga atualizar do backend, mantém o usuário autenticado
          // se já estava registrado
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const fetchUserData = async () => {
    try {
      const apiData: APIData = await userAPI.getProfile();
      
      // Transform API data to match frontend UserData interface
      const transformedData: UserData = {
        name: `${apiData.first_name} ${apiData.last_name}`.trim() || apiData.username,
        email: apiData.email,
        cpf: apiData.pessoa_fisica?.cpf || '',
        accountType: apiData.pessoa_juridica ? 'Pessoa Jurídica' : 'Pessoa Física'
      };
      
      setUserData(transformedData);
      // Atualiza o localStorage com os dados mais recentes
      localStorage.setItem('userData', JSON.stringify(transformedData));
    } catch (error) {
      console.error('Erro ao buscar perfil do usuário:', error);
      throw error;
    }
  };

  // Função para atualizar os dados do usuário manualmente
  const refreshUserData = async () => {
    if (isAuthenticated) {
      await fetchUserData();
    }
  };

  const logout = () => {
    localStorage.removeItem('userRegistered');
    localStorage.removeItem('userData');
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setUserData(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userData, 
      setIsAuthenticated, 
      setUserData, 
      logout, 
      loading,
      refreshUserData
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}