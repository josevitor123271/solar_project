// src/components/PhysicalPersonForm.tsx
import { useState } from 'react';
import AddressFields from './AddressFields';

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
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Nome completo */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-600 mb-1">Nome completo</label>
        <input
          type="text"
          placeholder="Ex: João Silva Santos"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 focus:shadow-sm placeholder:text-gray-400"
        />
      </div>

      {/* CPF com máscara */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">CPF</label>
        <div className="relative">
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(applyMask(e.target.value, 'cpf'))}
            placeholder="000.000.000-00"
            maxLength={14}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 focus:shadow-sm placeholder:text-gray-400"
          />
          <i className="fas fa-id-card absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* RG */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">RG</label>
        <input
          type="text"
          placeholder="00.000.000-0"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 focus:shadow-sm placeholder:text-gray-400"
        />
      </div>

      {/* Data de nascimento */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Data de nascimento</label>
        <input
          type="date"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 focus:shadow-sm"
        />
      </div>

      {/* E-mail */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">E-mail</label>
        <div className="relative">
          <input
            type="email"
            placeholder="joao@exemplo.com"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 focus:shadow-sm placeholder:text-gray-400"
          />
          <i className="fas fa-envelope absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Telefone com máscara */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-600 mb-1">Telefone</label>
        <div className="relative">
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(applyMask(e.target.value, 'phone'))}
            placeholder="(00) 00000-0000"
            maxLength={15}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 focus:shadow-sm placeholder:text-gray-400"
          />
          <i className="fas fa-phone absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Endereço */}
      <AddressFields />

      {/* Botão de cadastro */}
      <button className="md:col-span-2 mt-4 flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 hover:-translate-y-px hover:shadow-md transition">
        <i className="fas fa-user-plus"></i> Cadastrar Pessoa Física
      </button>
    </div>
  );
}