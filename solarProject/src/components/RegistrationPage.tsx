import { useNavigate } from "react-router-dom";
// import Logo from "./Logo";

export default function RegistrationPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FEFAE0' }}>
      <div className="max-w-2xl w-full p-8">
        {/* <div className="text-center mb-8">
          <Logo />
          <p className="mt-1" style={{ color: '#0A400C' }}>Energia limpa para um futuro inteligente</p>
        </div> */}

        <div className="bg-white rounded-lg shadow-lg p-8" style={{ borderColor: '#819067', borderWidth: '2px' }}>
          <h2 className="text-3xl font-bold text-center mb-6" style={{ color: '#0A400C' }}>
            Selecione o tipo de cadastro
          </h2>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate('/pessoa-fisica')}
              className="w-full px-8 py-4 text-white font-semibold rounded-lg hover:-translate-y-1 hover:shadow-xl transition-all text-lg flex items-center justify-center gap-3"
              style={{ backgroundColor: '#0A400C' }}
            >
              <i className="fas fa-user"></i>
              Pessoa Física (CPF)
            </button>

            <button
              onClick={() => navigate('/pessoa-juridica')}
              className="w-full px-8 py-4 text-white font-semibold rounded-lg hover:-translate-y-1 hover:shadow-xl transition-all text-lg flex items-center justify-center gap-3"
              style={{ backgroundColor: '#0A400C' }}
            >
              <i className="fas fa-building"></i>
              Pessoa Jurídica (CNPJ)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}