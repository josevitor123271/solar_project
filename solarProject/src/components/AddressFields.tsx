export default function AddressFields() {
  return (
    <>
      <div className="col-span-full">
        <label className="block text-sm font-medium text-gray-600 mb-1">CEP</label>
        <input
          type="text"
          placeholder="00000-000"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 focus:shadow-sm placeholder:text-gray-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Logradouro</label>
        <input
          type="text"
          placeholder="Rua, Avenida..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 focus:shadow-sm placeholder:text-gray-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Número</label>
        <input
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 focus:shadow-sm placeholder:text-gray-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Complemento</label>
        <input
          type="text"
          placeholder="Apt, Bloco..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 focus:shadow-sm placeholder:text-gray-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Bairro</label>
        <input
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 focus:shadow-sm placeholder:text-gray-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Cidade</label>
        <input
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 focus:shadow-sm placeholder:text-gray-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Estado</label>
        <input
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 focus:shadow-sm placeholder:text-gray-400"
        />
      </div>

      <div className="col-span-full">
        <label className="block text-sm font-medium text-gray-600 mb-1">País</label>
        <input
          type="text"
          value="Brasil"
          readOnly
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base bg-gray-50 text-gray-500 cursor-not-allowed"
        />
      </div>
    </>
  );
}