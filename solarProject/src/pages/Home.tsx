import { useState } from 'react';
import { Sun, Search, Menu } from 'lucide-react';
import FilteProductSidebar from '../components/FilteProductSidebar';
import CartSidebar from '../components/CartSidebar';
import { motion } from 'framer-motion';

type Categoria =
    | 'Módulos'
    | 'Inversores'
    | 'Componentes elétricos'
    | 'Estruturas Galvanizadas'
    | 'Estruturas nox'
    | 'Parafusos'
    | 'Cabos'
    | 'Baterias';

type ItemCarrinho = {
    id: number;
    nome: string;
    preco: number;
    quantidade: number;
};

// Definição dos tipos para os filtros
type Marca = string;
type TipoProduto = string;

interface Filtros {
    categorias: Categoria[];
    precoMin: number;
    precoMax: number;
    feedback: number;
    marcas: Marca[];
    tiposProduto: TipoProduto[];
    disponivel: boolean | null;
}

const Home = () => {
    // const [categoriaSelecionada, setCategoriaSelecionada] = useState<Categoria>('Módulos');

    // Itens mockados do carrinho
    const [itensCarrinho, setItensCarrinho] = useState<ItemCarrinho[]>([
        { id: 1, nome: 'Módulo Solar 550W', preco: 1299.90, quantidade: 2 },
        { id: 2, nome: 'Inversor 5kW', preco: 3500.00, quantidade: 1 },
        { id: 3, nome: 'Cabo Solar 6mm', preco: 89.50, quantidade: 50 },
    ]);

    // Função para formatar valores monetários
    // const formatarMoeda = (valor: number): string => {
    //     return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    // };

    // const categorias: Categoria[] = [
    //     'Módulos',
    //     'Inversores',
    //     'Componentes elétricos',
    //     'Estruturas Galvanizadas',
    //     'Estruturas nox',
    //     'Parafusos',
    //     'Cabos',
    //     'Baterias'
    // ];

    // Função para lidar com a mudança de filtros
    const handleFiltrosChange = (filtros: Filtros) => {
        console.log('Filtros atualizados:', filtros);
        // Aqui você pode implementar a lógica para filtrar os produtos
    };

    // Funções para gerenciar o carrinho
    const handleRemoveItem = (id: number) => {
        setItensCarrinho(itensCarrinho.filter(item => item.id !== id));
    };

    const handleUpdateQuantity = (id: number, quantidade: number) => {
        setItensCarrinho(itensCarrinho.map(item =>
            item.id === id ? { ...item, quantidade } : item
        ));
    };

    return (
        <motion.div 
            className="min-h-screen bg-gray-50 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Header fixo */}
            <motion.header 
                className="bg-white rounded-full p-6 mb-2"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="grid grid-cols-3 gap-4 items-center">
                    <motion.div 
                        className="flex items-center"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className="flex items-center gap-3">
                            <motion.div
                                whileHover={{ 
                                    scale: 1.1, 
                                    rotate: [0, 5, -5, 0],
                                    transition: { duration: 0.5 }
                                }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 400 }}
                                animate={{ 
                                    rotate: [0, 10, -10, 0],
                                    transition: { 
                                        duration: 3,
                                        repeat: Infinity,
                                        repeatType: "reverse"
                                    }
                                }}
                            >
                                <Sun className="w-6 h-6 text-black" />
                            </motion.div>
                            <div>
                                <motion.h1 
                                    className="text-base font-semibold text-black"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ 
                                        duration: 0.5, 
                                        delay: 0.2,
                                        type: "spring",
                                        stiffness: 100
                                    }}
                                    whileHover={{ 
                                        scale: 1.05,
                                        color: "#4B5563"
                                    }}
                                >
                                    SolarProject
                                </motion.h1>
                                <motion.p 
                                    className="text-sm text-gray-600"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ 
                                        duration: 0.5, 
                                        delay: 0.3,
                                        type: "spring",
                                        stiffness: 100
                                    }}
                                >
                                    Energia Solar
                                </motion.p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Coluna 2: Links de Navegação */}
                    <motion.div 
                        className="flex items-center justify-center gap-6"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <motion.a 
                            href="#" 
                            className="text-black font-semibold hover:text-gray-600 transition-colors"
                            whileHover={{ y: -2, color: "#4B5563" }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            Início
                        </motion.a>
                        <motion.a 
                            href="#" 
                            className="text-black font-light hover:text-gray-600 transition-colors"
                            whileHover={{ y: -2, color: "#4B5563" }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            Produtos
                        </motion.a>
                        <motion.a 
                            href="#" 
                            className="text-black font-light hover:text-gray-600 transition-colors"
                            whileHover={{ y: -2, color: "#4B5563" }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            Sobre
                        </motion.a>
                        <motion.a 
                            href="#" 
                            className="text-black font-light hover:text-gray-600 transition-colors"
                            whileHover={{ y: -2, color: "#4B5563" }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            Contato
                        </motion.a>
                    </motion.div>

                    {/* Coluna 3: Ícones de Pesquisa e Menu */}
                    <motion.div 
                        className="flex items-center justify-end gap-4"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <motion.button 
                            className="text-black hover:text-gray-600 transition-colors p-2"
                            whileHover={{ 
                                scale: 1.1,
                                rotate: [0, 5, -5, 0],
                                transition: { duration: 0.3 }
                            }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <Search className="w-6 h-6 cursor-pointer" />
                        </motion.button>
                        <motion.button 
                            className="text-black hover:text-gray-600 transition-colors p-2"
                            whileHover={{ 
                                scale: 1.1,
                                rotate: [0, 5, -5, 0],
                                transition: { duration: 0.3 }
                            }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <Menu className="w-6 h-6 cursor-pointer" />
                        </motion.button>
                    </motion.div>
                </div>
            </motion.header>

            {/* Conteúdo principal com sidebar de filtros */}
            <motion.div 
                className="flex flex-1 gap-2 p-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                {/* Sidebar de filtros */}
                <div className="w-[300px]">
                    <FilteProductSidebar onFiltrosChange={handleFiltrosChange} />
                </div>

                {/* Área de produtos */}
                <motion.div 
                    className="flex-1 grid grid-cols-3 gap-4 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                        <motion.div 
                            key={item} 
                            className="bg-white rounded-xl p-4 flex flex-col hover:scale-105 transform transition-all duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 * item }}
                            whileHover={{ 
                                y: -5,
                                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
                            }}
                        >
                            <div className="bg-gray-100 rounded-lg h-40 flex items-center justify-center mb-4">
                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                            </div>
                            <div className="grow">
                                <h3 className="font-semibold text-gray-800 mb-1">Produto Exemplo {item}</h3>
                                <p className="text-sm text-gray-600 mb-3">Descrição breve do produto exemplo para demonstração</p>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-lg font-bold text-gray-900">R$ {(item * 100).toFixed(2)}</span>
                                <motion.button 
                                    className="bg-[#111111] hover:bg-[#111111] cursor-pointer text-white rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200"
                                    whileHover={{ 
                                        scale: 1.05,
                                        backgroundColor: "#374151"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3, delay: 0.1 * item + 0.2 }}
                                >
                                    + Cart
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Carrinho */}
                <motion.div 
                    className="w-1/4 bg-white rounded-lg p-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <CartSidebar
                        itensCarrinho={itensCarrinho}
                        onRemoveItem={handleRemoveItem}
                        onUpdateQuantity={handleUpdateQuantity}
                    />
                </motion.div>
            </motion.div>

            {/* Footer */}
            <motion.footer 
                className="bg-white rounded-lg p-4 mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ y: -2 }}
            >
                <motion.div 
                    className="text-center text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                >
                    <p>© 2023 SolarProject - Todos os direitos reservados</p>
                </motion.div>
            </motion.footer>
        </motion.div>
    );
};

export default Home;