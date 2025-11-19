import { useNavigate } from "react-router-dom";
// import Logo from "./Logo";

export default function RegistrationPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Coluna da esquerda - Container de seleção de modo de cadastro */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-lg w-full rounded-lg p-8 border-2 border-[#f6f6f6]">
          <h2 className="text-3xl font-bold text-center mb-6 text-[#111111]">
            Selecione o tipo de cadastro
          </h2>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate('/pessoa-fisica')}
              className="w-full px-8 py-4 text-[#ffffff] font-semibold rounded-lg cursor-pointer hover:bg-[#73d0b9] transition-all text-lg flex items-center justify-center gap-3 bg-[#bfeadf]"
            >
              <i className="fas fa-user"></i>
              Pessoa Física (CPF)
            </button>

            <button
              onClick={() => navigate('/pessoa-juridica')}
              className="w-full px-8 py-4 text-[#ffffff] font-semibold rounded-lg cursor-pointer hover:bg-[#73d0b9] transition-all text-lg flex items-center justify-center gap-3 bg-[#bfeadf]"
            >
              <i className="fas fa-building"></i>
              Pessoa Jurídica (CNPJ)
            </button>

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full px-8 py-4 font-semibold rounded-lg cursor-pointer hover:bg-[#bfeadf] transition-all text-lg flex items-center justify-center gap-3 text-[#111111] bg-[#f6f6f6]"
            >
              <i className="fas fa-chart-line"></i>
              Ver Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Coluna da direita - Textos */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-[#99ddcc]">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-[#111111]">Solar Project</h1>
          <p className="text-base mb-6 text-[#111111]">Sistema de Gerenciamento de Energia Solar</p>
        </div>
      </div>
    </div>
  );
}