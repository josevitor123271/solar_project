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
    <div className="flex rounded-full p-1 w-fit" style={{ backgroundColor: '#A6B28B' }}>
      <button
        onClick={() => handleClick("pf")}
        className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all font-medium text-sm ${type === "pf"
            ? "shadow-sm"
            : ""
          }`}
        style={type === "pf" ? { backgroundColor: '#F5C9B0', color: '#1C352D' } : { color: '#1C352D' }}
      >
        <span>sun</span> Pessoa Física (CPF)
      </button>
      <button
        onClick={() => handleClick("pj")}
        className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all font-medium text-sm ${type === "pj"
            ? "shadow-sm"
            : ""
          }`}
        style={type === "pj" ? { backgroundColor: '#F5C9B0', color: '#1C352D' } : { color: '#1C352D' }}
      >
        <span>gear</span> Pessoa Jurídica (CNPJ)
      </button>
    </div>
  );
}