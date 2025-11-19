import { useState, useEffect } from 'react';
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

// Tipo para os produtos
type Produto = {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  disponivel: boolean; // Nova propriedade para controlar a disponibilidade
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

  // Produtos mockados com disponibilidade
  const [produtos] = useState<Produto[]>([
    { id: 1, nome: 'Módulo Solar 550W', descricao: 'Alta eficiência, 25 anos de garantia', preco: 1299.90, disponivel: true },
    { id: 2, nome: 'Inversor 5kW', descricao: 'Conversão eficiente de energia solar', preco: 3500.00, disponivel: false },
    { id: 3, nome: 'Cabo Solar 6mm', descricao: 'Cabo de alta qualidade para conexões', preco: 89.50, disponivel: true },
    { id: 4, nome: 'Estrutura de Fixação', descricao: 'Estrutura resistente para telhados', preco: 850.00, disponivel: true },
    { id: 5, nome: 'Bateria 10kWh', descricao: 'Armazenamento de energia para uso noturno', preco: 4500.00, disponivel: false },
    { id: 6, nome: 'Controlador de Carga', descricao: 'Proteção para sistema fotovoltaico', preco: 320.00, disponivel: true },
    { id: 7, nome: 'Kit Completo 3kW', descricao: 'Solução completa para residências', preco: 8900.00, disponivel: false },
    { id: 8, nome: 'Microinversor', descricao: 'Otimização de energia por módulo', preco: 450.00, disponivel: false },
    { id: 9, nome: 'Monitor de Energia', descricao: 'Acompanhamento em tempo real', preco: 180.00, disponivel: true },
    { id: 10, nome: 'Proteção contra Surto', descricao: 'Proteção para equipamentos', preco: 120.00, disponivel: true },
    { id: 11, nome: 'Conector MC4', descricao: 'Conector padrão para sistemas solares', preco: 5.50, disponivel: false },
    { id: 12, nome: 'Caixa de Passagem', descricao: 'Proteção para cabos e conexões', preco: 75.00, disponivel: false },
    
    // Adicionando mais produtos
    { id: 13, nome: 'String Box 8 Entradas', descricao: 'Distribuição e proteção de strings', preco: 280.00, disponivel: false },
    { id: 14, nome: 'Medidor Bidirecional', descricao: 'Monitoramento de energia injetada', preco: 420.00, disponivel: false },
    { id: 15, nome: 'Pelicula Anti Reflexo', descricao: 'Aumento de eficiência dos módulos', preco: 15.00, disponivel: true },
    { id: 16, nome: 'Kit Fixação Telhado', descricao: 'Estrutura para telhados cerâmicos', preco: 1200.00, disponivel: true },
    { id: 17, nome: 'Inversor Híbrido 8kW', descricao: 'Com função de backup e grid-tie', preco: 7500.00, disponivel: false },
    { id: 18, nome: 'Banco de Baterias 15kWh', descricao: 'Armazenamento de grande capacidade', preco: 12000.00, disponivel: true },
    { id: 19, nome: 'Cabo Photovoltaic 10mm', descricao: 'Cabo solar de maior bitola', preco: 120.00, disponivel: false },
    { id: 20, nome: 'Disjuntor CC 63A', descricao: 'Proteção para circuitos de corrente contínua', preco: 85.00, disponivel: true },
    { id: 21, nome: 'Kit Energia Solar 5kW', descricao: 'Sistema completo para médias residências', preco: 15000.00, disponivel: true },
    { id: 22, nome: 'Sensor de Temperatura', descricao: 'Monitoramento de temperatura dos módulos', preco: 45.00, disponivel: false },
    { id: 23, nome: 'Parafuso de Fixação Solar', descricao: 'Parafusos especiais para montagem', preco: 0.50, disponivel: true },
    { id: 24, nome: 'Estrutura Solo 10kW', descricao: 'Estrutura para instalação no solo', preco: 3200.00, disponivel: true }
  ]);

  // Estado para armazenar os produtos filtrados
  const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>(produtos);

  // Função para formatar valores monetários
  // const formatarMoeda = (valor: number): string => {
  //     return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  // };

  // Inicializar produtos filtrados com todos os produtos
  useEffect(() => {
    setProdutosFiltrados(produtos);
  }, [produtos]);

  // Função para lidar com a mudança de filtros
  const handleFiltrosChange = (filtros: Filtros) => {
    console.log('Filtros atualizados:', filtros);
    
    // Aplicar filtros aos produtos
    let produtosFiltrados = [...produtos];
    
    // Filtro de disponibilidade
    if (filtros.disponivel !== null) {
      produtosFiltrados = produtosFiltrados.filter(produto => 
        filtros.disponivel ? produto.disponivel : !produto.disponivel
      );
    }
    
    // Filtro de preço
    produtosFiltrados = produtosFiltrados.filter(produto => 
      produto.preco >= filtros.precoMin && produto.preco <= filtros.precoMax
    );
    
    // Outros filtros podem ser adicionados aqui
    
    setProdutosFiltrados(produtosFiltrados);
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
            {produtosFiltrados.map((produto, index) => (
                <motion.div 
                    key={produto.id} 
                    className="bg-white rounded-xl p-4 flex flex-col h-80" // Altura fixa de 20rem (320px)
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                        duration: 0.3, 
                        delay: 0.1 * index,
                        type: "spring",
                        stiffness: 100
                    }}
                    whileHover={{ 
                        y: -5,
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
                    }}
                >
                    <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center mb-4"> {/* Altura fixa para a imagem */}
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                    </div>
                    <div className="flex-grow"> {/* Permite que esta seção cresça para preencher o espaço */}
                        <h3 className="font-semibold text-gray-800 mb-1 truncate">{produto.nome}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2 h-10">{produto.descricao}</p>
                        {/* Indicador de disponibilidade */}
                        <div className="flex items-center mb-2">
                          <span className={`inline-block w-3 h-3 rounded-full mr-2 ${produto.disponivel ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          <span className="text-xs text-gray-500">
                            {produto.disponivel ? 'Em estoque' : 'Fora de estoque'}
                          </span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-2 flex-shrink-0"> {/* Impede que esta seção encolha */}
                        <span className="text-lg font-bold text-gray-900">R$ {produto.preco.toFixed(2)}</span>
                        <motion.button 
                            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                              produto.disponivel 
                                ? 'bg-[#111111] hover:bg-[#111111] cursor-pointer text-white' 
                                : 'bg-gray-300 cursor-not-allowed text-gray-500'
                            }`}
                            whileHover={produto.disponivel ? { 
                                scale: 1.05,
                                backgroundColor: "#374151"
                            } : {}}
                            whileTap={produto.disponivel ? { scale: 0.95 } : {}}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 * index + 0.2 }}
                            disabled={!produto.disponivel}
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