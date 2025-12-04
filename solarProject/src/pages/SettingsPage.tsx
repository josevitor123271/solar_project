// src/pages/SettingsPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, RefreshCw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import WarningExit from '../components/WarningExit';

const SettingsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();
  const { userData, logout, loading, refreshUserData } = useAuth();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Aqui você pode adicionar a lógica para alternar o tema
  };

  // Função para atualizar os dados do usuário
  const handleRefreshData = async () => {
    setIsRefreshing(true);
    try {
      await refreshUserData();
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Função para lidar com erros de carregamento de imagem
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
    target.nextElementSibling?.classList.remove('hidden');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* Modal de aviso */}
      <WarningExit
        isOpen={showWarning}
        onClose={() => setShowWarning(false)}
        onConfirm={() => {
          setShowWarning(false);
          logout();
        }}
      />
      
      {/* Main Container */}
      <main className="w-full max-w-3xl animate-fade-in-up mx-auto py-8 px-4">
        {/* Header / Breadcrumb Area */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Verificação de Conta</h1>
            <p className="text-base text-slate-500 dark:text-gray-400 mt-1">Gerencia suas informações em sua conta pessoal.</p>
          </div>

          <div className="flex items-center gap-2">
            {/* Botão de Atualizar Dados */}
            <button 
              onClick={handleRefreshData}
              disabled={isRefreshing}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm font-medium disabled:opacity-50"
            >
              <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
              {isRefreshing ? 'Atualizando...' : 'Atualizar'}
            </button>

            {/* Botão de Logout */}
            <button 
              onClick={() => setShowWarning(true)}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors text-sm font-medium"
            >
              <LogOut size={16} />
              Sair
            </button>

            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm"
            >
              <i className={`ph ph-${isDarkMode ? 'sun' : 'moon-stars'} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white dark:bg-dark-card rounded-2xl border border-slate-200 dark:border-dark-border shadow-soft overflow-hidden">
          {/* Cover / Banner Area */}
          <div className="h-32 w-full bg-gradient-to-r from-slate-100 to-slate-200 dark:from-[#1a1a1a] dark:to-[#111] relative">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          </div>

          <div className="px-8 pb-8">
            {/* Avatar Section (overlapping banner) */}
            <div className="relative -mt-12 flex items-end justify-between mb-8">
              <div className="flex items-end gap-6">
                <div className="relative group">
                  <div className="h-24 w-24 rounded-full border-4 border-white dark:border-dark-card bg-slate-200 dark:bg-dark-border overflow-hidden shadow-sm flex items-center justify-center">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" 
                      alt="Profile" 
                      className="h-full w-full object-cover"
                      onError={handleImageError}
                    />
                    <div className="hidden absolute inset-0 bg-slate-200 dark:bg-dark-border flex items-center justify-center">
                      <User size={40} className="text-slate-400 dark:text-gray-600" />
                    </div>
                  </div>
                  <button className="absolute bottom-0 right-0 bg-brand-600 text-white p-1.5 rounded-full border-[3px] border-white dark:border-dark-card shadow-sm hover:bg-brand-500 transition-colors">
                    <i className="ph-bold ph-camera text-xs"></i>
                  </button>
                </div>
                <div className="mb-2">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">{userData?.name || 'Nome do Usuário'}</h2>
                  <p className="text-sm text-slate-500 dark:text-gray-400">{userData?.email || 'email@exemplo.com'}</p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">Verified Active</span>
              </div>
            </div>

            {/* Form Grid */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              {/* Section: Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-500">Full Name</label>
                  <div className="relative group">
                    <i className="ph ph-user absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-600 group-focus-within:text-brand-500 transition-colors"></i>
                    <input 
                      type="text" 
                      id="name" 
                      value={userData?.name || 'Nome do Usuário'}
                      readOnly
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-dark-input border border-slate-200 dark:border-dark-border rounded-xl text-slate-900 dark:text-gray-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-sm font-medium cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-500">Email Address</label>
                  <div className="relative group">
                    <i className="ph ph-envelope-simple absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-600 group-focus-within:text-brand-500 transition-colors"></i>
                    <input 
                      type="email" 
                      id="email" 
                      value={userData?.email || 'email@exemplo.com'}
                      readOnly
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-dark-input border border-slate-200 dark:border-dark-border rounded-xl text-slate-900 dark:text-gray-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-sm font-medium cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* Section: Legal Entity / Role */}
              <div className="pt-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-500 mb-2 block">Entity Type & Role</label>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Role Selection Card (Active) */}
                  <div className={`relative flex items-start gap-3 p-4 rounded-xl border-2 ${userData?.accountType === 'Pessoa Física' ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-900/10' : 'border-slate-200 dark:border-dark-border'} cursor-not-allowed transition-all`}>
                    <div className="mt-0.5">
                      <div className={`w-4 h-4 rounded-full border ${userData?.accountType === 'Pessoa Física' ? 'border-brand-500' : 'border-slate-300 dark:border-gray-600'} flex items-center justify-center`}>
                        {userData?.accountType === 'Pessoa Física' && (
                          <div className="w-2 h-2 rounded-full bg-brand-500"></div>
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">Pessoa Física</h3>
                      <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5 leading-relaxed">Individual account for personal use and basic billing.</p>
                    </div>
                  </div>

                  {/* Role Selection Card (Inactive) */}
                  <div className={`relative flex items-start gap-3 p-4 rounded-xl border ${userData?.accountType === 'Pessoa Jurídica' ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-900/10' : 'border-slate-200 dark:border-dark-border'} cursor-not-allowed transition-all`}>
                    <div className="mt-0.5">
                      <div className={`w-4 h-4 rounded-full border ${userData?.accountType === 'Pessoa Jurídica' ? 'border-brand-500' : 'border-slate-300 dark:border-gray-600'} flex items-center justify-center`}>
                        {userData?.accountType === 'Pessoa Jurídica' && (
                          <div className="w-2 h-2 rounded-full bg-brand-500"></div>
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">Pessoa Jurídica</h3>
                      <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5 leading-relaxed">Corporate account for business tax handling.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional ID Field (Contextual) */}
              <div className="space-y-2">
                <label htmlFor="cpf" className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-500">CPF (Tax ID)</label>
                <div className="relative w-full md:w-1/2 group">
                  <i className="ph ph-identification-card absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-600 group-focus-within:text-brand-500 transition-colors"></i>
                  <input 
                    type="text" 
                    id="cpf" 
                    value={userData?.cpf || '000.000.000-00'}
                    readOnly
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-dark-input border border-slate-200 dark:border-dark-border rounded-xl text-slate-900 dark:text-gray-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-sm font-medium font-mono tracking-wide cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="h-px bg-slate-100 dark:bg-dark-border my-6"></div>

              {/* Action Buttons - Desabilitados pois os campos são somente leitura */}
              <div className="flex items-center justify-end gap-3">
                <button 
                  type="button" 
                  disabled
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-gray-400 bg-slate-100 dark:bg-dark-input cursor-not-allowed"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-400 dark:text-gray-500 bg-slate-200 dark:bg-dark-input cursor-not-allowed shadow-none"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 flex justify-between items-center px-2">
          <p className="text-base text-black">
            Criado por José Vitor, Júlia Sobral e Maria Monalisa
          </p>
          <a href="#" className="text-xs text-brand-600 dark:text-brand-500 hover:underline">
            Disiciplina do Warlles
          </a>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;