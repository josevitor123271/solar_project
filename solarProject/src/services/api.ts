// Configuração da API
const API_BASE_URL = 'http://localhost:8000/api';

// Tipos para Pessoa Física
export interface PessoaFisica {
  id?: number;
  cpf: string;
  nome_completo: string;
  data_nascimento: string;
  rg: string;
  email: string;
  telefone_principal: string;
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  pais: string;
  complemento?: string;
}

// Tipos para Pessoa Jurídica
export interface PessoaJuridica {
  id?: number;
  razao_social: string;
  nome_fantasia: string;
  data_abertura: string;
  email_comercial: string;
  telefone_principal: string;
  inscricao_estadual: string;
  cnpj: string;
  site?: string;
  complemento?: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
  numero: string;
  pais: string;
}

// Função auxiliar para fazer requisições
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Erro na requisição' }));
    throw new Error(error.detail || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// API para Pessoa Física
export const pessoaFisicaAPI = {
  // Listar todas
  getAll: async (): Promise<PessoaFisica[]> => {
    const data = await fetchAPI('/pessoas-fisicas/');
    return data.results || data;
  },

  // Buscar por ID
  getById: async (id: number): Promise<PessoaFisica> => {
    return fetchAPI(`/pessoas-fisicas/${id}/`);
  },

  // Criar
  create: async (pessoa: Omit<PessoaFisica, 'id'>): Promise<PessoaFisica> => {
    return fetchAPI('/pessoas-fisicas/', {
      method: 'POST',
      body: JSON.stringify(pessoa),
    });
  },

  // Atualizar
  update: async (id: number, pessoa: Partial<PessoaFisica>): Promise<PessoaFisica> => {
    return fetchAPI(`/pessoas-fisicas/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(pessoa),
    });
  },

  // Deletar
  delete: async (id: number): Promise<void> => {
    await fetchAPI(`/pessoas-fisicas/${id}/`, {
      method: 'DELETE',
    });
  },
};

// API para Pessoa Jurídica
export const pessoaJuridicaAPI = {
  // Listar todas
  getAll: async (): Promise<PessoaJuridica[]> => {
    const data = await fetchAPI('/pessoas-juridicas/');
    return data.results || data;
  },

  // Buscar por ID
  getById: async (id: number): Promise<PessoaJuridica> => {
    return fetchAPI(`/pessoas-juridicas/${id}/`);
  },

  // Criar
  create: async (pessoa: Omit<PessoaJuridica, 'id'>): Promise<PessoaJuridica> => {
    return fetchAPI('/pessoas-juridicas/', {
      method: 'POST',
      body: JSON.stringify(pessoa),
    });
  },

  // Atualizar
  update: async (id: number, pessoa: Partial<PessoaJuridica>): Promise<PessoaJuridica> => {
    return fetchAPI(`/pessoas-juridicas/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(pessoa),
    });
  },

  // Deletar
  delete: async (id: number): Promise<void> => {
    await fetchAPI(`/pessoas-juridicas/${id}/`, {
      method: 'DELETE',
    });
  },
};