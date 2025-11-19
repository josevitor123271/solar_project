// src/components/PhysicalPersonForm.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pessoaFisicaAPI } from '../services/api';

// Função de máscara reutilizável (sem dependências externas)
const applyMask = (
  value: string,
  mask: 'cpf' | 'phone'
): string => {
  const digits = value.replace(/\D/g, '');

  if (mask === 'cpf') {
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .substring(0, 14);
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

  return value;
};

export default function PhysicalPersonForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estados dos campos
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [rg, setRg] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [complemento, setComplemento] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Remove formatação dos campos
      const cpfLimpo = cpf.replace(/\D/g, '');
      const telefoneLimpo = phone.replace(/\D/g, '');
      const cepLimpo = cep.replace(/\D/g, '');

      // Validações básicas
      if (cpfLimpo.length !== 11) {
        throw new Error('CPF deve conter 11 dígitos');
      }
      if (cepLimpo.length !== 8) {
        throw new Error('CEP deve conter 8 dígitos');
      }

      const pessoaData = {
        cpf: cpfLimpo,
        nome_completo: nomeCompleto,
        data_nascimento: dataNascimento,
        rg: rg,
        email: email,
        telefone_principal: telefoneLimpo,
        cep: cepLimpo,
        logradouro: logradouro,
        numero: numero,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        pais: 'Brasil',
        complemento: complemento || undefined,
      };

      await pessoaFisicaAPI.create(pessoaData);

      // Redireciona para o Dashboard após sucesso
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao cadastrar pessoa física');
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

      {/* Nome completo */}
      <div className="md:col-span-2">
        <label className="block text-left text-sm font-medium text-gray-600 mb-1">Nome completo</label>
        <input
          type="text"
          value={nomeCompleto}
          onChange={(e) => setNomeCompleto(e.target.value)}
          placeholder="Ex: João Silva Santos"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder:text-gray-400 text-black bg-white"
        />
      </div>

      {/* CPF com máscara */}
      <div>
        <label className="block text-left text-sm font-medium text-gray-600 mb-1">CPF</label>
        <div className="relative">
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(applyMask(e.target.value, 'cpf'))}
            placeholder="000.000.000-00"
            maxLength={14}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder:text-gray-400 text-black bg-white"
          />
          <i className="fas fa-id-card absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* RG */}
      <div>
        <label className="block text-left text-sm font-medium text-gray-600 mb-1">RG</label>
        <input
          type="text"
          value={rg}
          onChange={(e) => setRg(e.target.value)}
          placeholder="00.000.000-0"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder:text-gray-400 text-black bg-white"
        />
      </div>

      {/* Data de nascimento */}
      <div>
        <label className="block text-left text-sm font-medium text-gray-600 mb-1">Data de nascimento</label>
        <input
          type="date"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black bg-white"
        />
      </div>

      {/* E-mail */}
      <div>
        <label className="block text-left text-sm font-medium text-gray-600 mb-1">E-mail</label>
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="joao@exemplo.com"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder:text-gray-400 text-black bg-white"
          />
          <i className="fas fa-envelope absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Telefone com máscara */}
      <div className="md:col-span-2">
        <label className="block text-left text-sm font-medium text-gray-600 mb-1">Telefone</label>
        <div className="relative">
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(applyMask(e.target.value, 'phone'))}
            placeholder="(00) 00000-0000"
            maxLength={15}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder:text-gray-400 text-black bg-white"
          />
          <i className="fas fa-phone absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
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
        <label className="block text-left text-sm font-medium text-gray-600 mb-1">Cidade</label>
        <input
          type="text"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
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
        className="md:col-span-2 mt-4 flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 text-[#111111] font-light cursor-pointer rounded-lg hover:bg-[#99ddcc] transition disabled:opacity-50 disabled:cursor-not-allowed bg-[#bfeadf]"
      >
        {loading ? (
          <>
            <i className="fas fa-spinner fa-spin"></i> Cadastrando...
          </>
        ) : (
          <>
            <i className="fas fa-user-plus"></i> Cadastrar Pessoa Física
          </>
        )}
      </button>
    </form>
  );
}