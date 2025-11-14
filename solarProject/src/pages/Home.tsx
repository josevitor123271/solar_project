import { useState } from 'react';
import { Sun, Search, Menu } from 'lucide-react';

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

    return (
        <div className="min-h-screen p-2 bg-gray-50">
            <div className="grid grid-cols-8 grid-rows-8 gap-2 h-[calc(100vh-1rem)]">
                {/* Header - Ocupa toda a largura (8 colunas) dividido em 3 colunas */}
                <div className="col-span-8 bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                    <div className="grid grid-cols-3 gap-4 items-center h-full">
                        {/* Coluna 1: Logo */}
                        <div className="flex items-center">
                            <div className="flex items-center gap-3">
                                <Sun className="w-10 h-10 text-black" />
                                <div>
                                    <h1 className="text-2xl font-bold text-black">
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
                            <a href="#" className="text-black font-semibold hover:text-gray-600 transition-colors">
                                Produtos
                            </a>
                            <a href="#" className="text-black font-semibold hover:text-gray-600 transition-colors">
                                Sobre
                            </a>
                            <a href="#" className="text-black font-semibold hover:text-gray-600 transition-colors">
                                Contato
                            </a>
                        </div>

                        {/* Coluna 3: Ícones de Pesquisa e Menu */}
                        <div className="flex items-center justify-end gap-4">
                            <button className="text-black hover:text-gray-600 transition-colors p-2">
                                <Search className="w-6 h-6" />
                            </button>
                            <button className="text-black hover:text-gray-600 transition-colors p-2">
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar Esquerda - Filtros de Categorias (2 colunas, 6 linhas, linha 2) */}
                <div className="col-span-2 row-span-6 row-start-2 bg-white rounded-lg shadow-lg p-6 overflow-y-auto">
                    <h2 className="text-2xl font-bold text-black mb-6">Categorias</h2>
                    <nav className="space-y-3">
                        {categorias.map((categoria) => (
                            <label
                                key={categoria}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                                <input
                                    type="checkbox"
                                    checked={categoriaSelecionada === categoria}
                                    onChange={() => setCategoriaSelecionada(categoria)}
                                    className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black focus:ring-2 cursor-pointer"
                                />
                                <span className="text-black font-medium flex-1">
                                    {categoria}
                                </span>
                            </label>
                        ))}
                    </nav>
                </div>

                {/* Card Inferior Direito - Lista de Produtos (4 colunas, 6 linhas, col 3, linha 2) */}
                <div className="col-span-4 row-span-6 col-start-3 row-start-2 bg-white rounded-lg shadow-lg p-6 overflow-y-auto">
                    <h3 className="text-2xl font-bold text-black mb-4">
                        {categoriaSelecionada}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Exemplo de produtos - será substituído por dados reais */}
                        <div className="bg-white">
                            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                <Sun className="w-24 h-24 text-gray-400" />
                            </div>
                            <div className="p-4">
                                <h4 className="font-bold text-black text-lg mb-2">
                                    Módulo Solar 550W Premium
                                </h4>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                    Módulo fotovoltaico de alta eficiência com tecnologia monocristalina. Ideal para instalações residenciais e comerciais.
                                </p>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-2xl font-bold text-green-600">
                                        {formatarMoeda(1299.90)}
                                    </span>
                                </div>
                                <button className="w-full px-4 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                                    Adicionar ao Carrinho
                                </button>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden">
                            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                <Sun className="w-24 h-24 text-gray-400" />
                            </div>
                            <div className="p-4">
                                <h4 className="font-bold text-black text-lg mb-2">
                                    Inversor Grid-Tie 5kW
                                </h4>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                    Inversor solar conectado à rede elétrica com monitoramento via app. Compatível com sistemas de até 5kW.
                                </p>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-2xl font-bold text-green-600">
                                        {formatarMoeda(3500.00)}
                                    </span>
                                </div>
                                <button className="w-full px-4 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                                    Adicionar ao Carrinho
                                </button>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden">
                            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                <Sun className="w-24 h-24 text-gray-400" />
                            </div>
                            <div className="p-4">
                                <h4 className="font-bold text-black text-lg mb-2">
                                    Cabo Solar 6mm² 100m
                                </h4>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                    Cabo especial para energia solar com proteção UV. Resistente às intempéries e alta temperatura.
                                </p>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-2xl font-bold text-green-600">
                                        {formatarMoeda(89.50)}
                                    </span>
                                </div>
                                <button className="w-full px-4 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                                    Adicionar ao Carrinho
                                </button>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden">
                            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                <Sun className="w-24 h-24 text-gray-400" />
                            </div>
                            <div className="p-4">
                                <h4 className="font-bold text-black text-lg mb-2">
                                    Bateria Lítio 5kWh
                                </h4>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                    Bateria de lítio para armazenamento de energia solar. Vida útil de mais de 10 anos com garantia.
                                </p>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-2xl font-bold text-green-600">
                                        {formatarMoeda(8999.00)}
                                    </span>
                                </div>
                                <button className="w-full px-4 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                                    Adicionar ao Carrinho
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Direita - Carrinho de Compras (2 colunas, 6 linhas, col 7, linha 2) */}
                <div className="col-span-2 row-span-6 col-start-7 row-start-2 bg-white rounded-lg shadow-lg p-6 flex flex-col overflow-y-auto">
                    <h2 className="text-2xl font-bold text-black mb-6">Carrinho</h2>
                    
                    {/* Lista de Itens */}
                    <div className="flex-1 space-y-3 mb-4">
                        {itensCarrinho.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">Carrinho vazio</p>
                        ) : (
                            itensCarrinho.map((item) => (
                                <div key={item.id} className="p-3 bg-transparent">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-semibold text-black text-lg flex-1">
                                            {item.nome}
                                        </h4>
                                        <button className="text-red-500 hover:text-red-700 ml-2">
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-center text-lg">
                                        <span className="text-gray-600">
                                            Qtd: {item.quantidade}
                                        </span>
                                        <span className="font-semibold text-black">
                                            {formatarMoeda(item.preco * item.quantidade)}
                                        </span>
                                    </div>
                                    <p className="text-lg text-gray-500 mt-1">
                                        {formatarMoeda(item.preco)} un.
                                    </p>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Resumo do Carrinho */}
                    <div className="border-t border-gray-300 pt-4 space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="font-semibold text-black">
                                {formatarMoeda(subtotal)}
                            </span>
                        </div>
                        <div className="flex justify-between text-lg font-bold border-t border-gray-300 pt-3">
                            <span className="text-black">Total:</span>
                            <span className="text-green-600">
                                {formatarMoeda(total)}
                            </span>
                        </div>
                        <button className="w-full px-4 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors mt-4">
                            Finalizar Compra
                        </button>
                    </div>
                </div>

                {/* Footer - Rodapé (8 colunas, linha 8) */}
                <div className="col-span-8 col-start-1 row-start-8 bg-transparent rounded-lg shadow-lg p-4">
                    <div className="flex items-center justify-between text-white">
                        <div>
                            <p className="font-semibold text-black">SolarProject © 2025</p>
                            <p className="text-lg text-black">Energia limpa para um futuro inteligente</p>
                        </div>
                        <div className="flex gap-4">
                            <i className="fab fa-facebook text-2xl hover:text-yellow-400 cursor-pointer transition-colors"></i>
                            <i className="fab fa-instagram text-2xl hover:text-yellow-400 cursor-pointer transition-colors"></i>
                            <i className="fab fa-linkedin text-2xl hover:text-yellow-400 cursor-pointer transition-colors"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
