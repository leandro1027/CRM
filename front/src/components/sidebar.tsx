"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, LayoutDashboard, Users, Send, Columns } from "lucide-react"; // Usando lucide-react para ícones limpos

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
    { name: "Contatos", path: "/contatos", icon: <Users size={20} /> },
    { name: "Disparos", path: "/disparos", icon: <Send size={20} /> },
    { name: "Kanban", path: "/kamban", icon: <Columns size={20} /> },
  ];

  const linkClass = (path: string) =>
    `flex items-center gap-4 px-4 py-2.5 rounded-full transition-all duration-300 text-sm font-bold uppercase tracking-wider ${
      pathname === path 
        ? "bg-[#4a707a] text-white shadow-lg" 
        : "text-slate-400 hover:bg-[#163a4d] hover:text-white"
    } ${isCollapsed ? "justify-center px-0 w-10 h-10 mx-auto" : "w-full"}`;

  return (
    <aside 
      className={`relative h-screen bg-[#0a2533] border-r border-white/5 flex flex-col text-white transition-all duration-500 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Botão de Setinha (Toggle) */}
      <button 
        onClick={toggleSidebar}
        className="absolute -right-3 top-10 bg-[#4a707a] text-white rounded-full p-1 shadow-xl border border-[#0a2533] hover:scale-110 transition-transform z-50"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} /> }
      </button>

      {/* Logo Area */}
      <div className={`p-6 mb-4 transition-all duration-500 ${isCollapsed ? "opacity-0" : "opacity-100"}`}>
        {!isCollapsed && (
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tighter">PEDROSO</span>
            <span className="text-[10px] tracking-[0.3em] text-[#4a707a] -mt-1 uppercase font-bold">Automação</span>
          </div>
        )}
      </div>

      {/* Navegação */}
      <nav className="flex-1 space-y-4 px-4">
        {menuItems.map((item) => (
          <Link key={item.path} href={item.path} title={item.name} className={linkClass(item.path)}>
            <span className="shrink-0">{item.icon}</span>
            {!isCollapsed && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer da Sidebar */}
      <div className="p-4 border-t border-white/5 text-center overflow-hidden">
        {isCollapsed ? (
            <span className="text-[10px] font-bold text-[#4a707a]">P.A</span>
        ) : (
            <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold whitespace-nowrap">
                Sistema Pedroso v1.0
            </span>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;