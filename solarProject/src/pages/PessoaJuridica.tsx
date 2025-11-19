import { useNavigate } from 'react-router-dom';
import LegalPersonForm from '../components/LegalPersonForm';
// import Logo from '../components/Logo';

export default function PessoaJuridica() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-4xl w-full p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-gray-200">
          <h2 className="text-2xl font-bold text-center mb-6 text-black">
            Cadastro Pessoa Jurídica
          </h2>

          <LegalPersonForm />

          <div className="mt-6 pt-6 border-t border-gray-300">
            <button
              onClick={() => navigate('/pessoa-fisica')}
              className="w-full px-6 py-3 font-light rounded-full cursor-pointer hover:bg-gray-100 transition-all flex items-center justify-center gap-2 border-2 border-black text-black bg-white"
            >
              <i className="fas fa-user"></i>
              Cadastrar como Pessoa Física
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="w-full mt-3 px-6 py-3 font-light rounded-full cursor-pointer hover:bg-gray-100 transition-all flex items-center justify-center gap-2 border-2 border-gray-400 text-gray-700 bg-white"
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
