// src/components/LegalPersonForm.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pessoaJuridicaAPI } from '../services/api';

// Função de máscara reutilizável (sem dependências externas)
const applyMask = (
  value: string,
  mask: 'cnpj' | 'phone' | 'ie'
): string => {
  const digits = value.replace(/\D/g, '');

  if (mask === 'cnpj') {
    return digits
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .substring(0, 18);
  }

  if (mask === 'phone') {
    if (digits.length <= 10) {
      return digits
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .substring(0, 14);
    }
    return digits
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .substring(0, 15);
  }

  if (mask === 'ie') {
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .substring(0, 15);
  }

  return value;
};

export default function LegalPersonForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Estados dos campos
  const [cnpj, setCnpj] = useState('');
  const [phone, setPhone] = useState('');
  const [ie, setIe] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [dataAbertura, setDataAbertura] = useState('');
  const [emailComercial, setEmailComercial] = useState('');
  const [site, setSite] = useState('');
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [estado, setEstado] = useState('');
  const [complemento, setComplemento] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Remove formatação dos campos
      const cnpjLimpo = cnpj.replace(/\D/g, '');
      const telefoneLimpo = phone.replace(/\D/g, '');
      const cepLimpo = cep.replace(/\D/g, '');
      const ieLimpo = ie.replace(/\D/g, '');

      // Validações básicas
      if (cnpjLimpo.length !== 14) {
        throw new Error('CNPJ deve conter 14 dígitos');
      }
      if (cepLimpo.length !== 8) {
        throw new Error('CEP deve conter 8 dígitos');
      }

      const pessoaData = {
        razao_social: razaoSocial,
        nome_fantasia: nomeFantasia,
        data_abertura: dataAbertura,
        email_comercial: emailComercial,
        telefone_principal: telefoneLimpo,
        inscricao_estadual: ieLimpo,
        cnpj: cnpjLimpo,
        site: site || undefined,
        complemento: complemento || undefined,
        logradouro: logradouro,
        bairro: bairro,
        estado: estado,
        numero: numero,
        pais: 'Brasil',
      };

      await pessoaJuridicaAPI.create(pessoaData);
      
      // Redireciona para o Dashboard após sucesso
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao cadastrar pessoa jurídica');
      console.error('Erro ao cadastrar:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {error && (
        <div className="md:col-span-2 p-4 rounded-lg border border-red-400 text-red-700 bg-white">
          <p className="font-semibold">Erro:</p>
          <p>{error}</p>
        </div>
      )}
      {/* Razão Social */}
      <div className="md:col-span-2">
        <label className="block text-left text-sm font-medium text-gray-600 mb-1">Razão Social</label>
        <input
          type="text"
          value={razaoSocial}
          onChange={(e) => setRazaoSocial(e.target.value)}
          placeholder="Empresa Exemplo Ltda"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder:text-gray-400 text-black bg-white"
        />
      </div>

      {/* Nome Fantasia */}
      <div className="md:col-span-2">
        <label className="block text-left text-sm font-medium text-gray-600 mb-1">Nome Fantasia</label>
        <input
          type="text"
          value={nomeFantasia}
          onChange={(e) => setNomeFantasia(e.target.value)}
          placeholder="Exemplo Solar"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder:text-gray-400 text-black bg-white"
        />
      </div>

      {/* CNPJ com máscara */}
      <div>
        <label className="block text-left text-sm font-medium text-gray-600 mb-1">CNPJ</label>
        <div className="relative">
          <input
            type="text"
            value={cnpj}
            onChange={(e) => setCnpj(applyMask(e.target.value, 'cnpj'))}
            placeholder="00.000.000/0001-00"
            maxLength={18}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder:text-gray-400 text-black bg-white"
          />
          <i className="fas fa-building absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Inscrição Estadual com máscara */}
      <div>
        <label className="block text-left text-sm font-medium text-gray-600 mb-1">Inscrição Estadual</label>
        <input
          type="text"
          value={ie}
          onChange={(e) => setIe(applyMask(e.target.value, 'ie'))}
          placeholder="000.000.000.000"
          maxLength={15}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder:text-gray-400 text-black bg-white"
        />
      </div>

      {/* Data de abertura */}
      <div>
        <label className="block text-left text-sm font-medium text-gray-600 mb-1">Data de abertura</label>
        <input
          type="date"
          value={dataAbertura}
          onChange={(e) => setDataAbertura(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black bg-white"
        />
      </div>

      {/* E-mail comercial */}
      <div>
        <label className="block text-left text-sm font-medium text-gray-600 mb-1">E-mail comercial</label>
        <div className="relative">
          <input
            type="email"
            value={emailComercial}
            onChange={(e) => setEmailComercial(e.target.value)}
            placeholder="contato@exemplo.com"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder:text-gray-400 text-black bg-white"
          />
          <i className="fas fa-envelope absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Telefone com máscara */}
      <div>
        <label className="block text-left text-sm font-medium text-gray-600 mb-1">Telefone principal</label>
        <div className="relative">
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(applyMask(e.target.value, 'phone'))}
            placeholder="(00) 0000-0000"
            maxLength={15}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder:text-gray-400 text-black bg-white"
          />
          <i className="fas fa-phone absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Site institucional */}
      <div>
        <label className="block text-left text-sm font-medium text-gray-600 mb-1">Site institucional (opcional)</label>
        <div className="relative">
          <input
            type="url"
            value={site}
            onChange={(e) => setSite(e.target.value)}
            placeholder="https://www.exemplo.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder:text-gray-400 text-black bg-white"
          />
          <i className="fas fa-globe absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Endereço */}
      <div className="md:col-span-2">
        <label className="block text-left text-sm font-medium text-gray-600 mb-1">CEP</label>
        <input
          type="text"
          value={cep}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            if (value.length <= 8) {
              setCep(value.replace(/(\d{5})(\d)/, '$1-$2'));
            }
          }}
          placeholder="00000-000"
          maxLength={9}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder:text-gray-400 text-black bg-white"
        />
      </div>

      <div>
        <label className="block text-left text-sm font-medium text-gray-600 mb-1">Logradouro</label>
        <input
          type="text"
          value={logradouro}
          onChange={(e) => setLogradouro(e.target.value)}
          placeholder="Rua, Avenida..."
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder:text-gray-400 text-black bg-white"
        />
      </div>
      <div>
        <label className="block text-left text-sm font-medium text-gray-600 mb-1">Número</label>
        <input
          type="text"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder:text-gray-400 text-black bg-white"
        />
      </div>

      <div>
        <label className="block text-left text-sm font-medium text-gray-600 mb-1">Complemento</label>
        <input
          type="text"
          value={complemento}
          onChange={(e) => setComplemento(e.target.value)}
          placeholder="Apt, Bloco..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder:text-gray-400 text-black bg-white"
        />
      </div>
      <div>
        <label className="block text-left text-sm font-medium text-gray-600 mb-1">Bairro</label>
        <input
          type="text"
          value={bairro}
          onChange={(e) => setBairro(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder:text-gray-400 text-black bg-white"
        />
      </div>

      <div>
        <label className="block text-left text-sm font-medium text-gray-600 mb-1">Estado</label>
        <input
          type="text"
          value={estado}
          onChange={(e) => setEstado(e.target.value.toUpperCase())}
          placeholder="SP"
          maxLength={2}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder:text-gray-400 text-black bg-white"
        />
      </div>

      <div className="md:col-span-2">
        <label className="block text-left text-sm font-medium text-gray-600 mb-1">País</label>
        <input
          type="text"
          value="Brasil"
          readOnly
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base cursor-not-allowed bg-gray-100 text-gray-600"
        />
      </div>

      {/* Botão de cadastro */}
      <button
        type="submit"
        disabled={loading}
        className="md:col-span-2 mt-4 flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 text-[#111111] font-light rounded-lg hover:bg-[#99ddcc] transition disabled:opacity-50 disabled:cursor-not-allowed bg-[#bfeadf]"
      >
        {loading ? (
          <>
            <i className="fas fa-spinner fa-spin"></i> Cadastrando...
          </>
        ) : (
          <>
            <i className="fas fa-building"></i> Cadastrar Empresa
          </>
        )}
      </button>
    </form>
  );
}