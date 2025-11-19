import { useState } from 'react';
import { Sun, Search, Menu } from 'lucide-react';
import FilteProductSidebar from '../components/FilteProductSidebar';

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
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<Categoria>('Módulos');
    
    // Itens mockados do carrinho
    const [itensCarrinho] = useState<ItemCarrinho[]>([
        { id: 1, nome: 'Módulo Solar 550W', preco: 1299.90, quantidade: 2 },
        { id: 2, nome: 'Inversor 5kW', preco: 3500.00, quantidade: 1 },
        { id: 3, nome: 'Cabo Solar 6mm', preco: 89.50, quantidade: 50 },
    ]);

    // Calcular subtotal e total
    const subtotal = itensCarrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    const total = subtotal; // Por enquanto sem taxas ou descontos

    // Função para formatar valores monetários
    const formatarMoeda = (valor: number): string => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

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

    // Função para lidar com a mudança de filtros
    const handleFiltrosChange = (filtros: Filtros) => {
        console.log('Filtros atualizados:', filtros);
        // Aqui você pode implementar a lógica para filtrar os produtos
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header fixo */}
            <header className="bg-white rounded-full p-6 mb-2">
                <div className="grid grid-cols-3 gap-4 items-center">
                    <div className="flex items-center">
                        <div className="flex items-center gap-3">
                            <Sun className="w-6 h-6 text-black" />
                            <div>
                                <h1 className="text-base font-semibold text-black">
                                    SolarProject
                                </h1>
                                <p className="text-sm text-gray-600">
                                    Energia Solar
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Coluna 2: Links de Navegação */}
                    <div className="flex items-center justify-center gap-6">
                        <a href="#" className="text-black font-semibold hover:text-gray-600 transition-colors">
                            Início
                        </a>
                        <a href="#" className="text-black font-light hover:text-gray-600 transition-colors">
                            Produtos
                        </a>
                        <a href="#" className="text-black font-light hover:text-gray-600 transition-colors">
                            Sobre
                        </a>
                        <a href="#" className="text-black font-light hover:text-gray-600 transition-colors">
                            Contato
                        </a>
                    </div>

                    {/* Coluna 3: Ícones de Pesquisa e Menu */}
                    <div className="flex items-center justify-end gap-4">
                        <button className="text-black hover:text-gray-600 transition-colors p-2">
                            <Search className="w-6 h-6 cursor-pointer" />
                        </button>
                        <button className="text-black hover:text-gray-600 transition-colors p-2">
                            <Menu className="w-6 h-6 cursor-pointer" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Conteúdo principal com sidebar de filtros */}
            <div className="flex flex-1 gap-2 p-2">
                {/* Sidebar de filtros */}
                <div className="w-[300px]">
                    <FilteProductSidebar onFiltrosChange={handleFiltrosChange} />
                </div>

                {/* Área de produtos */}
                <div className="flex-1 bg-white rounded-lg p-4">
                    <div className="h-full flex items-center justify-center">
                        <p className="text-gray-500">Área de produtos</p>
                    </div>
                </div>

                {/* Carrinho */}
                <div className="w-1/4 bg-white rounded-lg p-4">
                    <div className="h-full flex items-center justify-center">
                        <p className="text-gray-500">Carrinho</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white rounded-lg p-4 mt-2">
                <div className="text-center text-gray-600">
                    <p>© 2023 SolarProject - Todos os direitos reservados</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;