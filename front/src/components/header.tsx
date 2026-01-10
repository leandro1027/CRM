"use client";

import React from "react";

const Header = () => {
  return (
    <header className="w-full h-20 border-b border-gray-100 flex items-center justify-between px-10 bg-white sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-3">
        {/* Ponto levemente maior */}
        <div className="h-2.5 w-2.5 bg-[#4a707a] rounded-full"></div>
        {/* Fonte aumentada de text-sm para text-base */}
        <span className="font-bold text-[#0a2533] uppercase tracking-wider text-base">
          Painel CRM
        </span>
      </div>

      <div className="flex items-center gap-5">
        <div className="text-right">
          {/* Fonte aumentada de text-xs para text-sm */}
          <p className="text-sm font-bold text-[#0a2533] leading-none">
            Usuário Interno
          </p>
          {/* Fonte aumentada de 10px para 11px */}
          <p className="text-[11px] text-gray-400 uppercase tracking-tighter mt-1">
            Administrador
          </p>
        </div>
        {/* Avatar aumentado de 10 para 12 */}
        <div className="h-12 w-12 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center text-[#0a2533] font-bold text-sm">
          UI
        </div>
      </div>
    </header>
  );
};

export default Header;