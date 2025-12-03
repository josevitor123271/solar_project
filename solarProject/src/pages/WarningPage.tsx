import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const WarningPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Volta para a página anterior
    };

    const handleReportProblem = () => {
        // Aqui você pode implementar a lógica para relatar um problema
        // Por exemplo, abrir um email ou redirecionar para uma página de suporte
        alert('Funcionalidade de relatar problema ainda não implementada.');
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-white flex flex-col items-center justify-center p-4"
        >
            <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-md w-full bg-gray-50 rounded-lg p-8 text-center"
            >
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                        type: "spring", 
                        stiffness: 260, 
                        damping: 20,
                        delay: 0.3 
                    }}
                    className="flex justify-center mb-4"
                >
                    <img 
                        src="../../../images/cat_meme.jpg" 
                        alt="Gato meme" 
                        className="w-32 h-32 object-contain rounded-lg"
                    />
                </motion.div>
                
                <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-2xl font-semibold text-gray-800 mb-4"
                >
                    Acesso Restrito
                </motion.h1>
                
                <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-base text-gray-600 mb-6"
                >
                    Você precisa se registrar como Pessoa Física ou Jurídica antes de acessar a página principal.
                </motion.p>
                
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleGoBack}
                        className="px-6 py-3 cursor-pointer bg-[#1D1616] text-white font-medium rounded-full hover:bg-opacity-90 transition-colors"
                    >
                        Voltar
                    </motion.button>
                    
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleReportProblem}
                        className="px-6 py-3 cursor-pointer border border-[#1D1616] text-[#1D1616] font-medium rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        Relatar um problema
                    </motion.button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default WarningPage;