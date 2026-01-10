"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  // Estilo baseado na identidade da Pedroso Automação
  const linkClass = (path: string) =>
    `block px-4 py-2.5 rounded-full transition-all duration-200 text-sm font-medium ${
      pathname === path 
        ? "bg-[#4a707a] text-white shadow-md" 
        : "text-gray-300 hover:bg-[#163a4d] hover:text-white"
    }`;

  return (
    <aside className="w-64 h-screen bg-[#0a2533] border-r border-white/10 flex flex-col text-white">
      <div className="p-6 mb-4">
        {/* Simulação do Logo */}
        <div className="flex flex-col">
          <span className="font-bold text-xl tracking-tight">PEDROSO</span>
          <span className="text-[10px] tracking-[0.2em] text-gray-400 -mt-1 uppercase">Automação</span>
        </div>
      </div>

      <nav className="flex-1 space-y-2 px-4">
        <Link href="/" className={linkClass("/")}>Dashboard</Link>
        <Link href="/contatos" className={linkClass("/contatos")}>Contatos</Link>
        <Link href="/disparos" className={linkClass("/disparos")}>Disparos</Link>
        <Link href="/kanban" className={linkClass("/kanban")}>Kanban</Link>
      </nav>

      <div className="p-4 border-t border-white/10 text-[10px] text-gray-500 text-center uppercase tracking-widest">
        Sistema Interno Pedroso Automação
      </div>
    </aside>
  );
};

export default Sidebar;