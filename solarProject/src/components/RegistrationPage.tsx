import { useNavigate } from "react-router-dom";
// import Logo from "./Logo";

export default function RegistrationPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-2xl w-full p-8">
        <div className="bg-white rounded-lg p-8 border-2 border-gray-200">
          <h2 className="text-3xl font-bold text-center mb-6 text-black">
            Selecione o tipo de cadastro
          </h2>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate('/pessoa-fisica')}
              className="w-full px-8 py-4 text-white font-semibold rounded-lg cursor-pointer hover:bg-gray-800 transition-all text-lg flex items-center justify-center gap-3 bg-black"
            >
              <i className="fas fa-user"></i>
              Pessoa Física (CPF)
            </button>

            <button
              onClick={() => navigate('/pessoa-juridica')}
              className="w-full px-8 py-4 text-white font-semibold rounded-lg cursor-pointer hover:bg-gray-800 transition-all text-lg flex items-center justify-center gap-3 bg-black"
            >
              <i className="fas fa-building"></i>
              Pessoa Jurídica (CNPJ)
            </button>

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full px-8 py-4 font-semibold rounded-lg cursor-pointer hover:bg-gray-100 transition-all text-lg flex items-center justify-center gap-3 border-2 border-black text-black bg-white"
            >
              <i className="fas fa-chart-line"></i>
              Ver Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}