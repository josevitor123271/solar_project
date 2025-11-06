import { useNavigate } from 'react-router-dom';
import LegalPersonForm from '../components/LegalPersonForm';
// import Logo from '../components/Logo';

export default function PessoaJuridica() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FEFAE0' }}>
      <div className="max-w-4xl w-full p-8">
        {/* <div className="text-center mb-8">
          <Logo />
          <p className="mt-1" style={{ color: '#0A400C' }}>Energia limpa para um futuro inteligente</p>
        </div> */}

        <div className="bg-white rounded-lg shadow-lg p-8" style={{ borderColor: '#819067', borderWidth: '2px' }}>
          <h2 className="text-2xl font-bold text-center mb-6" style={{ color: '#0A400C' }}>
            Cadastro Pessoa Jurídica
          </h2>

          <LegalPersonForm />

          <div className="mt-6 pt-6 border-t" style={{ borderColor: '#819067' }}>
            <button
              onClick={() => navigate('/pessoa-fisica')}
              className="w-full px-6 py-3 font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
              style={{ backgroundColor: '#819067', color: '#0A400C' }}
            >
              <i className="fas fa-user"></i>
              Cadastrar como Pessoa Física
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="w-full mt-3 px-6 py-3 font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
              style={{ backgroundColor: '#B1AB86', color: '#0A400C' }}
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
