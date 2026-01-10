import React from "react";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Título com contraste forte */}
      <div className="flex flex-col">
        <h1 className="text-3xl font-extrabold text-[#0a2533] tracking-tight">Dashboard Geral</h1>
        <p className="text-[11px] text-[#4a707a] uppercase tracking-[0.2em] font-bold mt-1">Status do Sistema em tempo real</p>
      </div>

      {/* Cards sem ícones - Foco total na métrica */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Clientes Ativos", val: "120", color: "bg-[#0a2533]" },
          { label: "Leads Abertos", val: "18", color: "bg-orange-600" },
          { label: "Vendas / Mês", val: "32", color: "bg-green-600" },
          { label: "Tarefas Pendentes", val: "9", color: "bg-blue-600" },
        ].map((item, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-center mb-4">
              {/* Texto em slate-600 para melhor leitura que o gray-400 */}
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{item.label}</span>
            </div>
            <h2 className="text-4xl font-black text-[#0a2533]">{item.val}</h2>
            <div className={`mt-4 h-1.5 w-12 ${item.color} rounded-full`}></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Container do Gráfico */}
        <div className="lg:col-span-2 p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col h-[450px]">
          <div>
            <p className="text-[#4a707a] text-xs uppercase tracking-widest font-extrabold">Relatórios</p>
            <h3 className="text-[#0a2533] text-2xl font-bold">Fluxo de Atendimentos</h3>
          </div>
          
          <div className="flex-1 w-full flex items-center justify-center border border-slate-100 rounded-2xl mt-6 bg-slate-50/50">
             <span className="text-slate-500 font-bold uppercase tracking-widest text-sm italic">Área do Gráfico de Desempenho</span>
          </div>
        </div>

        {/* Lista de Clientes */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <p className="font-bold text-[#0a2533] text-sm uppercase tracking-widest">Últimos Clientes</p>
            <button className="text-xs font-bold text-[#4a707a] hover:text-[#0a2533] transition-colors uppercase border-b-2 border-transparent hover:border-[#0a2533]">Ver todos</button>
          </div>

          <div className="space-y-6">
            {[
              { nome: "João Silva", status: "Ativo", color: "bg-green-100 text-green-800" },
              { nome: "Maria Oliveira", status: "Pendente", color: "bg-orange-100 text-orange-800" },
              { nome: "Carlos Souza", status: "Inativo", color: "bg-slate-100 text-slate-600" }
            ].map((user, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-default">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-[#0a2533] flex items-center justify-center text-white font-black text-xs">
                    {user.nome.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0a2533]">{user.nome}</p>
                    <p className="text-xs text-slate-500 font-medium">cliente@empresa.com.br</p>
                  </div>
                </div>
                <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${user.color}`}>
                  {user.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}