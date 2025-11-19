import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { pessoaFisicaAPI, pessoaJuridicaAPI } from '../services/api';
import type { PessoaFisica, PessoaJuridica } from '../services/api';

export default function Dashboard() {
  const [pessoasFisicas, setPessoasFisicas] = useState<PessoaFisica[]>([]);
  const [pessoasJuridicas, setPessoasJuridicas] = useState<PessoaJuridica[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'fisica' | 'juridica'>('fisica');

  // Carregar dados
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [fisicas, juridicas] = await Promise.all([
        pessoaFisicaAPI.getAll(),
        pessoaJuridicaAPI.getAll(),
      ]);
      setPessoasFisicas(fisicas);
      setPessoasJuridicas(juridicas);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
      console.error('Erro ao carregar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  // Deletar Pessoa Física
  const handleDeleteFisica = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta pessoa física?')) {
      return;
    }
    try {
      await pessoaFisicaAPI.delete(id);
      setPessoasFisicas(pessoasFisicas.filter((p) => p.id !== id));
    } catch (err) {
      alert('Erro ao excluir pessoa física');
      console.error(err);
    }
  };

  // Deletar Pessoa Jurídica
  const handleDeleteJuridica = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta pessoa jurídica?')) {
      return;
    }
    try {
      await pessoaJuridicaAPI.delete(id);
      setPessoasJuridicas(pessoasJuridicas.filter((p) => p.id !== id));
    } catch (err) {
      alert('Erro ao excluir pessoa jurídica');
      console.error(err);
    }
  };

  // Formatar data
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="text-2xl font-semibold text-black">Carregando dados...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 text-black">
            Dashboard - Solar Project
          </h1>
          <p className="text-lg text-gray-600">
            Gerenciamento de Pessoas Físicas e Jurídicas
          </p>
        </div>

        {/* Botão de voltar */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-block px-4 py-2 rounded-lg font-semibold transition-colors text-[#111111] hover:bg-[#99ddcc] bg-[#bfeadf]"
          >
            ← Voltar para Registro
          </Link>
        </div>

        {/* Erro */}
        {error && (
          <div className="mb-6 p-4 rounded-lg border border-red-400 text-red-700 bg-white">
            <p className="font-semibold">Erro:</p>
            <p>{error}</p>
            <button
              onClick={loadData}
              className="mt-2 px-4 py-2 text-[#111111] rounded hover:bg-[#99ddcc] bg-[#bfeadf]"
            >
              Tentar Novamente
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6 flex gap-4 border-b-2 border-gray-300">
          <button
            onClick={() => setActiveTab('fisica')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'fisica'
                ? 'border-b-4 border-black text-black'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Pessoas Físicas ({pessoasFisicas.length})
          </button>
          <button
            onClick={() => setActiveTab('juridica')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'juridica'
                ? 'border-b-4 border-black text-black'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Pessoas Jurídicas ({pessoasJuridicas.length})
          </button>
        </div>

        {/* Conteúdo das Tabs */}
        {activeTab === 'fisica' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">
              Pessoas Físicas
            </h2>
            {pessoasFisicas.length === 0 ? (
              <div className="text-center py-12 rounded-lg bg-white border-2 border-gray-200">
                <p className="text-lg text-gray-600">
                  Nenhuma pessoa física cadastrada ainda.
                </p>
                <Link
                  to="/pessoa-fisica"
                  className="inline-block mt-4 px-6 py-2 rounded-lg font-semibold transition-colors text-[#111111] hover:bg-[#99ddcc] bg-[#bfeadf]"
                >
                  Cadastrar Pessoa Física
                </Link>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pessoasFisicas.map((pessoa) => (
                  <div
                    key={pessoa.id}
                    className="p-6 rounded-lg bg-white border border-gray-200"
                  >
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-2 text-black">
                        {pessoa.nome_completo}
                      </h3>
                      <p className="text-sm text-gray-600">
                        CPF: {pessoa.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}
                      </p>
                    </div>
                    <div className="space-y-2 text-sm mb-4 text-gray-700">
                      <p><strong className="text-black">Email:</strong> {pessoa.email}</p>
                      <p><strong className="text-black">Telefone:</strong> {pessoa.telefone_principal}</p>
                      <p><strong className="text-black">Data Nascimento:</strong> {formatDate(pessoa.data_nascimento)}</p>
                      <p><strong className="text-black">RG:</strong> {pessoa.rg}</p>
                      <p><strong className="text-black">Endereço:</strong> {pessoa.logradouro}, {pessoa.numero}</p>
                      <p><strong className="text-black">Bairro:</strong> {pessoa.bairro}</p>
                      <p><strong className="text-black">Cidade:</strong> {pessoa.cidade} - {pessoa.estado}</p>
                      <p><strong className="text-black">CEP:</strong> {pessoa.cep.replace(/(\d{5})(\d{3})/, '$1-$2')}</p>
                    </div>
                    <button
                      onClick={() => pessoa.id && handleDeleteFisica(pessoa.id)}
                      className="w-full px-4 py-2 rounded-lg font-semibold transition-colors text-[#111111] hover:bg-[#99ddcc] bg-[#bfeadf]"
                    >
                      Excluir
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'juridica' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">
              Pessoas Jurídicas
            </h2>
            {pessoasJuridicas.length === 0 ? (
              <div className="text-center py-12 rounded-lg bg-white border-2 border-gray-200">
                <p className="text-lg text-gray-600">
                  Nenhuma pessoa jurídica cadastrada ainda.
                </p>
                <Link
                  to="/pessoa-juridica"
                  className="inline-block mt-4 px-6 py-2 rounded-lg font-semibold transition-colors text-[#111111] hover:bg-[#99ddcc] bg-[#bfeadf]"
                >
                  Cadastrar Pessoa Jurídica
                </Link>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pessoasJuridicas.map((pessoa) => (
                  <div
                    key={pessoa.id}
                    className="p-6 rounded-lg bg-white border border-gray-200"
                  >
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-2 text-black">
                        {pessoa.razao_social}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {pessoa.nome_fantasia}
                      </p>
                      <p className="text-sm text-gray-600">
                        CNPJ: {pessoa.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')}
                      </p>
                    </div>
                    <div className="space-y-2 text-sm mb-4 text-gray-700">
                      <p><strong className="text-black">Email:</strong> {pessoa.email_comercial}</p>
                      <p><strong className="text-black">Telefone:</strong> {pessoa.telefone_principal}</p>
                      <p><strong className="text-black">Data Abertura:</strong> {formatDate(pessoa.data_abertura)}</p>
                      <p><strong className="text-black">IE:</strong> {pessoa.inscricao_estadual}</p>
                      {pessoa.site && <p><strong className="text-black">Site:</strong> {pessoa.site}</p>}
                      <p><strong className="text-black">Endereço:</strong> {pessoa.logradouro}, {pessoa.numero}</p>
                      <p><strong className="text-black">Bairro:</strong> {pessoa.bairro}</p>
                      <p><strong className="text-black">Estado:</strong> {pessoa.estado}</p>
                    </div>
                    <button
                      onClick={() => pessoa.id && handleDeleteJuridica(pessoa.id)}
                      className="w-full px-4 py-2 rounded-lg font-semibold transition-colors text-[#111111] hover:bg-[#99ddcc] bg-[#bfeadf]"
                    >
                      Excluir
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Botão de Página Principal */}
        <div className="mt-8 text-center">
          <Link
            to="/home"
            className="inline-block px-6 py-3 rounded-lg font-semibold transition-colors text-[#111111] hover:bg-[#99ddcc] bg-[#bfeadf]"
          >
            Página Principal
          </Link>
        </div>
      </div>
    </div>
  );
}