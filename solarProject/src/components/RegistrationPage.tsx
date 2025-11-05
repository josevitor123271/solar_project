import { useState } from "react";
import Logo from "./Logo";
import PhysicalPersonForm from "./PhysicalPersonForm";
import LegalPersonForm from "./LegalPersonForm";
import Illustration from "./Illustration";
import ToggleSwitch from "./ToggleSwitch";

type PersonType = "pf" | "pj";

export default function RegistrationPage() {
  const [formType, setFormType] = useState<PersonType>("pf");

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="grid md:grid-cols-2 max-w-6xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
        <section className="p-8 flex flex-col gap-8">
          <div>
            <Logo />
            <p className="mt-1 text-gray-600">Energia limpa para um futuro inteligente</p>
          </div>

          <ToggleSwitch onChange={setFormType} />

          <div className="mt-4">
            {formType === "pf" ? <PhysicalPersonForm /> : <LegalPersonForm />}
          </div>
        </section>

        <aside className="hidden md:block">
          <Illustration />
        </aside>
      </div>
    </div>
  );
}