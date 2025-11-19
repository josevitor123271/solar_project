import { useState } from 'react';
import { Slider } from '@/components/ui/slider';

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
  const marcas: Marca[] = [
    'SolarTech',
    'EcoEnergy',
    'GreenPower',
    'SunPower',
    'SolarMax'
  ];

  // Lista de tipos de produtos (exemplo)
  const tiposProduto: TipoProduto[] = [
    'Residencial',
    'Comercial',
    'Industrial',
    'Portátil',
    'Integrado'
  ];

  // Função para lidar com a seleção de categorias
  const handleCategoriaChange = (categoria: Categoria) => {
    const novasCategorias = categoriasSelecionadas.includes(categoria)
      ? categoriasSelecionadas.filter(c => c !== categoria)
      : [...categoriasSelecionadas, categoria];
    
    setCategoriasSelecionadas(novasCategorias);
    onFiltrosChange({
      categorias: novasCategorias,
      precoMin,
      precoMax,
      feedback,
      marcas: marcasSelecionadas,
      tiposProduto: tiposProdutoSelecionados,
      disponivel
    });
  };

  // Função para lidar com a seleção de marcas
  const handleMarcaChange = (marca: Marca) => {
    const novasMarcas = marcasSelecionadas.includes(marca)
      ? marcasSelecionadas.filter(m => m !== marca)
      : [...marcasSelecionadas, marca];
    
    setMarcasSelecionadas(novasMarcas);
    onFiltrosChange({
      categorias: categoriasSelecionadas,
      precoMin,
      precoMax,
      feedback,
      marcas: novasMarcas,
      tiposProduto: tiposProdutoSelecionados,
      disponivel
    });
  };

  // Função para lidar com a seleção de tipos de produto
  const handleTipoProdutoChange = (tipo: TipoProduto) => {
    const novosTipos = tiposProdutoSelecionados.includes(tipo)
      ? tiposProdutoSelecionados.filter(t => t !== tipo)
      : [...tiposProdutoSelecionados, tipo];
    
    setTiposProdutoSelecionados(novosTipos);
    onFiltrosChange({
      categorias: categoriasSelecionadas,
      precoMin,
      precoMax,
      feedback,
      marcas: marcasSelecionadas,
      tiposProduto: novosTipos,
      disponivel
    });
  };

  // Função para lidar com a mudança de preço
  const handlePrecoChange = (value: number[]) => {
    const [min, max] = value;
    setPrecoMin(min);
    setPrecoMax(max);
    onFiltrosChange({
      categorias: categoriasSelecionadas,
      precoMin: min,
      precoMax: max,
      feedback,
      marcas: marcasSelecionadas,
      tiposProduto: tiposProdutoSelecionados,
      disponivel
    });
  };

  // Função para lidar com a mudança de feedback
  const handleFeedbackChange = (value: number) => {
    setFeedback(value);
    onFiltrosChange({
      categorias: categoriasSelecionadas,
      precoMin,
      precoMax,
      feedback: value,
      marcas: marcasSelecionadas,
      tiposProduto: tiposProdutoSelecionados,
      disponivel
    });
  };

  // Função para lidar com a mudança de disponibilidade
  const handleDisponivelChange = (value: boolean | null) => {
    setDisponivel(value);
    onFiltrosChange({
      categorias: categoriasSelecionadas,
      precoMin,
      precoMax,
      feedback,
      marcas: marcasSelecionadas,
      tiposProduto: tiposProdutoSelecionados,
      disponivel: value
    });
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
    
    onFiltrosChange({
      categorias: [],
      precoMin: 0,
      precoMax: 1000,
      feedback: 0,
      marcas: [],
      tiposProduto: [],
      disponivel: null
    });
  };

  return (
    <div className="w-[300px] h-full bg-white p-0 rounded-lg flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold text-gray-800">Filtros</h2>
        <button 
          onClick={limparFiltros}
          className="text-sm text-blue-500 hover:text-blue-700"
        >
          Limpar tudo
        </button>
      </div>

      {/* Área de scroll para os filtros */}
      <div className="flex-grow overflow-y-auto p-4">
        {/* Filtro por Categorias */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2 text-gray-700">Categorias</h3>
          <div className="space-y-2">
            {categorias.map((categoria) => (
              <label key={categoria} className="flex items-center">
                <input
                  type="checkbox"
                  checked={categoriasSelecionadas.includes(categoria)}
                  onChange={() => handleCategoriaChange(categoria)}
                  className="mr-2 h-4 w-4 text-blue-600 rounded"
                />
                <span className="text-gray-600">{categoria}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Filtro por Preço */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2 text-gray-700">Preço</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">R$ {precoMin}</span>
                <span className="text-gray-600">R$ {precoMax}</span>
              </div>
              <Slider 
                min={0} 
                max={1000} 
                value={[precoMin, precoMax]} 
                onValueChange={handlePrecoChange}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Filtro por Feedback */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2 text-gray-700">Avaliações</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => (
              <label key={stars} className="flex items-center">
                <input
                  type="radio"
                  name="feedback"
                  checked={feedback === stars}
                  onChange={() => handleFeedbackChange(stars)}
                  className="mr-2 h-4 w-4 text-blue-600"
                />
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className={`text-lg ${i < stars ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="ml-2 text-gray-600">& up</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Filtro por Marca */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2 text-gray-700">Marca</h3>
          <div className="space-y-2">
            {marcas.map((marca) => (
              <label key={marca} className="flex items-center">
                <input
                  type="checkbox"
                  checked={marcasSelecionadas.includes(marca)}
                  onChange={() => handleMarcaChange(marca)}
                  className="mr-2 h-4 w-4 text-blue-600 rounded"
                />
                <span className="text-gray-600">{marca}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Filtro por Tipo de Produto */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2 text-gray-700">Tipo de Produto</h3>
          <div className="space-y-2">
            {tiposProduto.map((tipo) => (
              <label key={tipo} className="flex items-center">
                <input
                  type="checkbox"
                  checked={tiposProdutoSelecionados.includes(tipo)}
                  onChange={() => handleTipoProdutoChange(tipo)}
                  className="mr-2 h-4 w-4 text-blue-600 rounded"
                />
                <span className="text-gray-600">{tipo}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Filtro por Disponibilidade */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2 text-gray-700">Disponibilidade</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="disponivel"
                checked={disponivel === true}
                onChange={() => handleDisponivelChange(true)}
                className="mr-2 h-4 w-4 text-blue-600"
              />
              <span className="text-gray-600">Avaliados</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="disponivel"
                checked={disponivel === false}
                onChange={() => handleDisponivelChange(false)}
                className="mr-2 h-4 w-4 text-blue-600"
              />
              <span className="text-gray-600">Não avaliados</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="disponivel"
                checked={disponivel === null}
                onChange={() => handleDisponivelChange(null)}
                className="mr-2 h-4 w-4 text-blue-600"
              />
              <span className="text-gray-600">Todos</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}