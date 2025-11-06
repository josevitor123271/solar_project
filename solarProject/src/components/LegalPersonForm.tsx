// src/components/LegalPersonForm.tsx
import { useState } from 'react';
import AddressFields from './AddressFields';

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
  const [cnpj, setCnpj] = useState('');
  const [phone, setPhone] = useState('');
  const [ie, setIe] = useState('');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Razão Social */}
      <div className="md:col-span-2">
        <label className="block text-left text-sm font-medium text-gray-600 mb-1">Razão Social</label>
        <input
          type="text"
          placeholder="Empresa Exemplo Ltda"
          required
          className="w-full px-4 py-3 border rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:shadow-sm placeholder:text-gray-400"
          style={{ borderColor: '#819067' }}
          onFocus={(e) => e.target.style.borderColor = '#0A400C'}
          onBlur={(e) => e.target.style.borderColor = '#819067'}
        />
      </div>

      {/* Nome Fantasia */}
      <div className="md:col-span-2">
        <label className="block text-left text-sm font-medium text-gray-600 mb-1">Nome Fantasia</label>
        <input
          type="text"
          placeholder="Exemplo Solar"
          className="w-full px-4 py-3 border rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:shadow-sm placeholder:text-gray-400"
          style={{ borderColor: '#819067' }}
          onFocus={(e) => e.target.style.borderColor = '#0A400C'}
          onBlur={(e) => e.target.style.borderColor = '#819067'}
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
            className="w-full px-4 py-3 border rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:shadow-sm placeholder:text-gray-400"
          style={{ borderColor: '#819067' }}
          onFocus={(e) => e.target.style.borderColor = '#0A400C'}
          onBlur={(e) => e.target.style.borderColor = '#819067'}
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
          className="w-full px-4 py-3 border rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:shadow-sm placeholder:text-gray-400"
          style={{ borderColor: '#819067' }}
          onFocus={(e) => e.target.style.borderColor = '#0A400C'}
          onBlur={(e) => e.target.style.borderColor = '#819067'}
        />
      </div>

      {/* Data de abertura */}
      <div>
        <label className="block text-left text-sm font-medium text-gray-600 mb-1">Data de abertura</label>
        <input
          type="date"
          required
          className="w-full px-4 py-3 border rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:shadow-sm"
          style={{ borderColor: '#819067' }}
          onFocus={(e) => e.target.style.borderColor = '#0A400C'}
          onBlur={(e) => e.target.style.borderColor = '#819067'}
        />
      </div>

      {/* E-mail comercial */}
      <div>
        <label className="block text-left text-sm font-medium text-gray-600 mb-1">E-mail comercial</label>
        <div className="relative">
          <input
            type="email"
            placeholder="contato@exemplo.com"
            required
            className="w-full px-4 py-3 border rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:shadow-sm placeholder:text-gray-400"
          style={{ borderColor: '#819067' }}
          onFocus={(e) => e.target.style.borderColor = '#0A400C'}
          onBlur={(e) => e.target.style.borderColor = '#819067'}
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
            className="w-full px-4 py-3 border rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:shadow-sm placeholder:text-gray-400"
          style={{ borderColor: '#819067' }}
          onFocus={(e) => e.target.style.borderColor = '#0A400C'}
          onBlur={(e) => e.target.style.borderColor = '#819067'}
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
            placeholder="https://www.exemplo.com"
            className="w-full px-4 py-3 border rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:shadow-sm placeholder:text-gray-400"
          style={{ borderColor: '#819067' }}
          onFocus={(e) => e.target.style.borderColor = '#0A400C'}
          onBlur={(e) => e.target.style.borderColor = '#819067'}
          />
          <i className="fas fa-globe absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Endereço */}
      <AddressFields />

      {/* Botão de cadastro */}
      <button className="md:col-span-2 mt-4 flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 text-white font-semibold rounded-lg hover:-translate-y-px hover:shadow-md transition" style={{ backgroundColor: '#0A400C' }}>
        <i className="fas fa-building"></i> Cadastrar Empresa
      </button>
    </div>
  );
}