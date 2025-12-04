import React from 'react';
import { motion } from 'framer-motion';

interface WarningExitProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const WarningExit: React.FC<WarningExitProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <motion.div 
      className="fixed inset-0 bg-black/10 backdrop-blur-md flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg p-6 w-96"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">Confirmação de Saída</h2>
        <p className="mb-6 text-gray-600">Você tem certeza que deseja sair do sistema?</p>
        <div className="flex justify-end gap-3">
          <motion.button
            onClick={onClose}
            className="px-4 py-2 rounded-lg font-medium transition-colors text-gray-700 hover:bg-gray-100 bg-gray-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancelar
          </motion.button>
          <motion.button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg font-medium transition-colors text-white hover:bg-red-700 bg-red-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sair
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WarningExit;