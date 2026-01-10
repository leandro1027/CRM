const Header = () => {
  return (
    <header className="w-full h-16 border-b border-gray-100 flex items-center justify-between px-8 bg-white sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 bg-[#4a707a] rounded-full"></div>
        <span className="font-bold text-[#0a2533] uppercase tracking-wider text-sm">Painel CRM</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-xs font-bold text-[#0a2533] leading-none">Usuário Interno</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-tighter">Administrador</p>
        </div>
        <div className="h-10 w-10 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center text-[#0a2533] font-bold">
          UI
        </div>
      </div>
    </header>
  );
};

export default Header;