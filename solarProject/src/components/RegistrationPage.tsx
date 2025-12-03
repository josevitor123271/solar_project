import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// import Logo from "./Logo";

export default function RegistrationPage() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col md:flex-row bg-white"
    >
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full md:w-1/2 flex items-center justify-center p-8"
      >
        <div className="max-w-lg w-full rounded-lg p-8">
          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl font-semibold text-center mb-6 text-[#1D1616]"
          >
            Selecione o tipo de cadastro
          </motion.h2>

          <div className="flex flex-col gap-6">
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/pessoa-fisica')}
              className="w-full px-8 py-4 text-[#FFFFFF] font-semibold rounded-lg cursor-pointer hover:bg-[#1D1616] transition-all text-lg flex items-center justify-center gap-3 bg-[#1D1616]"
            >
              <i className="fas fa-user"></i>
              Pessoa Física (CPF)
            </motion.button>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/pessoa-juridica')}
              className="w-full px-8 py-4 text-[#FFFFFF] font-semibold rounded-lg cursor-pointer hover:bg-[#1D1616] transition-all text-lg flex items-center justify-center gap-3 bg-[#1D1616]"
            >
              <i className="fas fa-building"></i>
              Pessoa Jurídica (CNPJ)
            </motion.button>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/dashboard')}
              className="w-full px-8 py-4 font-semibold rounded-full cursor-pointer hover:bg-tranparent transition-all text-lg flex items-center justify-center gap-3 text-[#1D1616] bg-transparent"
            >
              <i className="fas fa-chart-line"></i>
              Ver Dashboard
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Coluna da direita - Textos */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-[#1D1616]"
      >
        <div className="text-center">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl font-semibold mb-4 text-[#FFFFFF]"
          >
            Solar Project
          </motion.h1>
          <motion.p 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-2xl mb-6 text-[#d6d2d2]"
          >
            Sistema de Gerenciamento de Energia Solar
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}