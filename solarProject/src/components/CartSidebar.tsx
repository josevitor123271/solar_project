import { motion } from 'framer-motion';

interface CartItem {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
}

interface CartSidebarProps {
  itensCarrinho: CartItem[];
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, quantidade: number) => void;
}

export default function CartSidebar({ itensCarrinho, onRemoveItem, onUpdateQuantity }: CartSidebarProps) {
  // Calcular subtotal e total
  const subtotal = itensCarrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
  const total = subtotal; // Por enquanto sem taxas ou descontos

  // Função para formatar valores monetários
  const formatarMoeda = (valor: number): string => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <motion.div 
      className="h-full flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="flex justify-between items-center mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h2 className="text-xl font-bold text-gray-800">Carrinho</h2>
        <motion.span 
          className="bg-gray-200 text-gray-800 text-sm font-medium px-2 py-1 rounded-full"
          initial={{ scale: 0 }}
          animate={{ 
            scale: 1,
            backgroundColor: itensCarrinho.length > 0 ? "#10B981" : "#E5E7EB",
            color: itensCarrinho.length > 0 ? "#FFFFFF" : "#1F2937"
          }}
          transition={{ 
            type: "spring", 
            stiffness: 500,
            damping: 30
          }}
          key={itensCarrinho.length} // Força a reanimação quando o valor muda
        >
          {itensCarrinho.length} {itensCarrinho.length === 1 ? 'item' : 'itens'}
        </motion.span>
      </motion.div>

      {/* Lista de itens no carrinho */}
      <motion.div 
        className="grow overflow-y-auto mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {itensCarrinho.length === 0 ? (
          <motion.p 
            className="text-gray-500 text-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            Seu carrinho está vazio
          </motion.p>
        ) : (
          <div className="space-y-4">
            {itensCarrinho.map((item, index) => (
              <motion.div 
                key={item.id}
                className="flex items-center p-3 bg-gray-50 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="grow">
                  <h3 className="font-medium text-gray-800">{item.nome}</h3>
                  <p className="text-gray-600 text-sm">{formatarMoeda(item.preco)}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantidade - 1))}
                      className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-md text-gray-600 hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="mx-2 text-gray-800">{item.quantidade}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantidade + 1)}
                      className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-md text-gray-600 hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-medium text-gray-800">
                    {formatarMoeda(item.preco * item.quantidade)}
                  </span>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="mt-2 text-red-500 hover:text-red-700 text-sm"
                  >
                    Remover
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Resumo do pedido */}
      <motion.div 
        className="border-t border-gray-200 pt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-800 font-medium">{formatarMoeda(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Frete</span>
            <span className="text-gray-800 font-medium">Grátis</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-gray-200">
            <span className="text-lg font-bold text-gray-800">Total</span>
            <span className="text-lg font-bold text-gray-800">{formatarMoeda(total)}</span>
          </div>
        </div>
        <motion.button
          className="w-full bg-[#111111] hover:bg-[#111111] text-white font-medium py-3 rounded-lg transition-colors duration-200"
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 4px 15px rgba(72, 187, 120, 0.4)"
          }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          Finalizar Compra
        </motion.button>
      </motion.div>
    </motion.div>
  );
}