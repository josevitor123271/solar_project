import { useState } from "react";

type PersonType = "pf" | "pj";

interface ToggleSwitchProps {
  onChange: (type: PersonType) => void;
}

export default function ToggleSwitch({ onChange }: ToggleSwitchProps) {
  const [type, setType] = useState<PersonType>("pf");

  const handleClick = (t: PersonType) => {
    setType(t);
    onChange(t);
  };

  return (
    <div className="flex bg-gray-200 rounded-full p-1 w-fit">
      <button
        onClick={() => handleClick("pf")}
        className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all font-medium text-sm ${type === "pf"
            ? "bg-emerald-200 text-green-900 shadow-sm"
            : "text-gray-600"
          }`}
      >
        <span>sun</span> Pessoa Física (CPF)
      </button>
      <button
        onClick={() => handleClick("pj")}
        className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all font-medium text-sm ${type === "pj"
            ? "bg-emerald-200 text-green-900 shadow-sm"
            : "text-gray-600"
          }`}
      >
        <span>gear</span> Pessoa Jurídica (CNPJ)
      </button>
    </div>
  );
}