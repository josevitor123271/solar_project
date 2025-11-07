import { useNavigate } from 'react-router-dom';
import PhysicalPersonForm from '../components/PhysicalPersonForm';
// import Logo from '../components/Logo';

export default function PessoaFisica() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-4xl w-full p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-gray-200">
          <h2 className="text-2xl font-bold text-center mb-6 text-black">
            Cadastro Pessoa Física
          </h2>

          <PhysicalPersonForm />

          <div className="mt-6 pt-6 border-t border-gray-300">
            <button
              onClick={() => navigate('/pessoa-juridica')}
              className="w-full px-6 py-3 font-semibold rounded-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2 border-2 border-black text-black bg-white"
            >
              <i className="fas fa-building"></i>
              Cadastrar como Pessoa Jurídica
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="w-full mt-3 px-6 py-3 font-semibold rounded-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2 border-2 border-gray-400 text-gray-700 bg-white"
            >
              <i className="fas fa-arrow-left"></i>
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
