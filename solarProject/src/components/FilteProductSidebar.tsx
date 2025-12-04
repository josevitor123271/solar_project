import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';

// Definição dos tipos
type Categoria = 
  | 'Módulos' 
  | 'Inversores' 
  | 'Componentes elétricos' 
  | 'Estruturas Galvanizadas' 
  | 'Estruturas nox' 
  | 'Parafusos' 
  | 'Cabos' 
  | 'Baterias';

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

interface FilteProductSidebarProps {
  onFiltrosChange: (filtros: Filtros) => void;
}

export default function FilteProductSidebar({ onFiltrosChange }: FilteProductSidebarProps) {
  // Estados dos filtros
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<Categoria[]>([]);
  const [precoMin, setPrecoMin] = useState<number>(0);
  const [precoMax, setPrecoMax] = useState<number>(1000);
  const [feedback, setFeedback] = useState<number>(0);
  const [marcasSelecionadas, setMarcasSelecionadas] = useState<Marca[]>([]);
  const [tiposProdutoSelecionados, setTiposProdutoSelecionados] = useState<TipoProduto[]>([]);
  const [disponivel, setDisponivel] = useState<boolean | null>(null);

  // Lista de categorias
  const categorias: Categoria[] = [
    'Módulos',
    'Inversores',
    'Componentes elétricos',
    'Estruturas Galvanizadas',
    'Estruturas nox',
    'Parafusos',
    'Cabos',
    'Baterias'
  ];

  // Lista de marcas (exemplo)
  const marcas: Marca[] = ['LG', 'Samsung', 'Panasonic', 'Canadian Solar', 'Trina Solar'];

  // Lista de tipos de produtos (exemplo)
  const tiposProduto: TipoProduto[] = ['Residencial', 'Comercial', 'Industrial'];

  // Função para lidar com a seleção de categorias
  const handleCategoriaChange = (categoria: Categoria) => {
    const novasCategorias = categoriasSelecionadas.includes(categoria)
      ? categoriasSelecionadas.filter(c => c !== categoria)
      : [...categoriasSelecionadas, categoria];
    
    setCategoriasSelecionadas(novasCategorias);
    enviarFiltros(novasCategorias, precoMin, precoMax, feedback, marcasSelecionadas, tiposProdutoSelecionados, disponivel);
  };

  // Função para lidar com a mudança de preço
  const handlePrecoChange = (value: number[]) => {
    const [min, max] = value;
    setPrecoMin(min);
    setPrecoMax(max);
    enviarFiltros(categoriasSelecionadas, min, max, feedback, marcasSelecionadas, tiposProdutoSelecionados, disponivel);
  };

  // Função para lidar com a mudança de feedback
  const handleFeedbackChange = (value: number) => {
    setFeedback(value);
    enviarFiltros(categoriasSelecionadas, precoMin, precoMax, value, marcasSelecionadas, tiposProdutoSelecionados, disponivel);
  };

  // Função para lidar com a seleção de marcas
  const handleMarcaChange = (marca: Marca) => {
    const novasMarcas = marcasSelecionadas.includes(marca)
      ? marcasSelecionadas.filter(m => m !== marca)
      : [...marcasSelecionadas, marca];
    
    setMarcasSelecionadas(novasMarcas);
    enviarFiltros(categoriasSelecionadas, precoMin, precoMax, feedback, novasMarcas, tiposProdutoSelecionados, disponivel);
  };

  // Função para lidar com a seleção de tipos de produto
  const handleTipoProdutoChange = (tipo: TipoProduto) => {
    const novosTipos = tiposProdutoSelecionados.includes(tipo)
      ? tiposProdutoSelecionados.filter(t => t !== tipo)
      : [...tiposProdutoSelecionados, tipo];
    
    setTiposProdutoSelecionados(novosTipos);
    enviarFiltros(categoriasSelecionadas, precoMin, precoMax, feedback, marcasSelecionadas, novosTipos, disponivel);
  };

  // Função para lidar com a seleção de disponibilidade
  const handleDisponivelChange = (value: boolean | null) => {
    setDisponivel(value);
    enviarFiltros(categoriasSelecionadas, precoMin, precoMax, feedback, marcasSelecionadas, tiposProdutoSelecionados, value);
  };

  // Função para limpar todos os filtros
  const limparFiltros = () => {
    setCategoriasSelecionadas([]);
    setPrecoMin(0);
    setPrecoMax(1000);
    setFeedback(0);
    setMarcasSelecionadas([]);
    setTiposProdutoSelecionados([]);
    setDisponivel(null);
    enviarFiltros([], 0, 1000, 0, [], [], null);
  };

  // Função para enviar os filtros atualizados para o componente pai
  const enviarFiltros = (
    cats: Categoria[],
    min: number,
    max: number,
    fb: number,
    marcas: Marca[],
    tipos: TipoProduto[],
    disp: boolean | null
  ) => {
    onFiltrosChange({
      categorias: cats,
      precoMin: min,
      precoMax: max,
      feedback: fb,
      marcas: marcas,
      tiposProduto: tipos,
      disponivel: disp
    });
  };

  return (
    <motion.div 
      className="w-[300px] bg-white rounded-lg p-0 h-full"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Cabeçalho do filtro */}
      <motion.div 
        className="p-4 border-b border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-gray-800">Filtros</h2>
          <motion.button 
            onClick={limparFiltros}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Limpar tudo
          </motion.button>
        </div>
        <p className="text-base text-gray-600">Ajuste os filtros para encontrar os produtos ideais</p>
      </motion.div>

      {/* Conteúdo dos filtros */}
      <motion.div 
        className="p-4 overflow-y-auto h-[calc(100%-80px)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {/* Seção de Categorias */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h3 className="text-md font-semibold text-gray-800 mb-3">Categorias</h3>
          <div className="space-y-2">
            {categorias.map((categoria, index) => (
              <motion.label 
                key={categoria}
                className="flex items-center space-x-2 cursor-pointer"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.3 + index * 0.05 }}
                whileHover={{ x: 5 }}
              >
                <input
                  type="checkbox"
                  checked={categoriasSelecionadas.includes(categoria)}
                  onChange={() => handleCategoriaChange(categoria)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{categoria}</span>
              </motion.label>
            ))}
          </div>
        </motion.div>

        {/* Seção de Preço */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <h3 className="text-md font-semibold text-gray-800 mb-3">Preço (R$)</h3>
          <div className="px-1">
            <Slider
              min={0}
              max={1000}
              value={[precoMin, precoMax]}
              onValueChange={handlePrecoChange}
              minStepsBetweenThumbs={1}
              step={10}
              className="mb-4"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>R$ {precoMin}</span>
              <span>R$ {precoMax}</span>
            </div>
          </div>
        </motion.div>

        {/* Seção de Feedback */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <h3 className="text-md font-semibold text-gray-800 mb-3">Avaliações</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((stars, index) => (
              <motion.label 
                key={stars}
                className="flex items-center space-x-2 cursor-pointer"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.5 + index * 0.05 }}
                whileHover={{ x: 5 }}
              >
                <input
                  type="radio"
                  name="feedback"
                  checked={feedback === stars}
                  onChange={() => handleFeedbackChange(stars)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < stars ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  {/* <span className="ml-2 text-sm text-gray-700">ou mais</span> */}
                </div>
              </motion.label>
            ))}
          </div>
        </motion.div>

        {/* Seção de Marcas */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <h3 className="text-md font-semibold text-gray-800 mb-3">Marcas</h3>
          <div className="space-y-2">
            {marcas.map((marca, index) => (
              <motion.label 
                key={marca}
                className="flex items-center space-x-2 cursor-pointer"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.6 + index * 0.05 }}
                whileHover={{ x: 5 }}
              >
                <input
                  type="checkbox"
                  checked={marcasSelecionadas.includes(marca)}
                  onChange={() => handleMarcaChange(marca)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{marca}</span>
              </motion.label>
            ))}
          </div>
        </motion.div>

        {/* Seção de Tipo de Produto */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <h3 className="text-md font-semibold text-gray-800 mb-3">Tipo de Produto</h3>
          <div className="space-y-2">
            {tiposProduto.map((tipo, index) => (
              <motion.label 
                key={tipo}
                className="flex items-center space-x-2 cursor-pointer"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.7 + index * 0.05 }}
                whileHover={{ x: 5 }}
              >
                <input
                  type="checkbox"
                  checked={tiposProdutoSelecionados.includes(tipo)}
                  onChange={() => handleTipoProdutoChange(tipo)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{tipo}</span>
              </motion.label>
            ))}
          </div>
        </motion.div>

        {/* Seção de Disponibilidade */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
        >
          <h3 className="text-md font-semibold text-gray-800 mb-3">Disponibilidade</h3>
          <div className="space-y-2">
            <motion.label 
              className="flex items-center space-x-2 cursor-pointer"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.8 }}
              whileHover={{ x: 5 }}
            >
              <input
                type="radio"
                name="disponivel"
                checked={disponivel === true}
                onChange={() => handleDisponivelChange(true)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Em estoque</span>
            </motion.label>
            <motion.label 
              className="flex items-center space-x-2 cursor-pointer"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.85 }}
              whileHover={{ x: 5 }}
            >
              <input
                type="radio"
                name="disponivel"
                checked={disponivel === false}
                onChange={() => handleDisponivelChange(false)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Fora de estoque</span>
            </motion.label>
            <motion.label 
              className="flex items-center space-x-2 cursor-pointer"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.9 }}
              whileHover={{ x: 5 }}
            >
              <input
                type="radio"
                name="disponivel"
                checked={disponivel === null}
                onChange={() => handleDisponivelChange(null)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Todos</span>
            </motion.label>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}