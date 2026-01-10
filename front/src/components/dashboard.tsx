"use client";

import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Dashboard() {

  const [resumo, setResumo] = useState({
    clientesAtivos: 0,
    leadsAbertos: 0,
    vendasMes: 0,
    tarefasPendentes: 0
  });

  const [ultimosClientes, setUltimosClientes] = useState<any[]>([]);

  useEffect(() => {

    // Totais do dashboard
    api.get("/dashboard/resumo").then(res => {
      setResumo(res.data);
    }).catch(() => {});

    // Últimos clientes
    api.get("/contatos/ultimos").then(res => {
      setUltimosClientes(res.data);
    }).catch(() => {});

  }, []);

  return (
    <div className="space-y-8">

      <div className="flex flex-col">
        <h1 className="text-3xl font-extrabold text-[#0a2533] tracking-tight">Dashboard Geral</h1>
        <p className="text-[11px] text-[#4a707a] uppercase tracking-[0.2em] font-bold mt-1">Status do Sistema em tempo real</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Clientes Ativos", val: resumo.clientesAtivos, color: "bg-[#0a2533]" },
          { label: "Leads Abertos", val: resumo.leadsAbertos, color: "bg-orange-600" },
          { label: "Vendas / Mês", val: resumo.vendasMes, color: "bg-green-600" },
          { label: "Tarefas Pendentes", val: resumo.tarefasPendentes, color: "bg-blue-600" },
        ].map((item, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{item.label}</span>
            </div>
            <h2 className="text-4xl font-black text-[#0a2533]">{item.val}</h2>
            <div className={`mt-4 h-1.5 w-12 ${item.color} rounded-full`}></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col h-[450px]">
          <div>
            <p className="text-[#4a707a] text-xs uppercase tracking-widest font-extrabold">Relatórios</p>
            <h3 className="text-[#0a2533] text-2xl font-bold">Fluxo de Atendimentos</h3>
          </div>
          <div className="flex-1 w-full flex items-center justify-center border border-slate-100 rounded-2xl mt-6 bg-slate-50/50">
            <span className="text-slate-500 font-bold uppercase tracking-widest text-sm italic">Área do Gráfico de Desempenho</span>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <p className="font-bold text-[#0a2533] text-sm uppercase tracking-widest">Últimos Clientes</p>
            <button className="text-xs font-bold text-[#4a707a] hover:text-[#0a2533] transition-colors uppercase border-b-2 border-transparent hover:border-[#0a2533]">
              Ver todos
            </button>
          </div>

          <div className="space-y-6">
            {ultimosClientes.map((user: any, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-default">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-[#0a2533] flex items-center justify-center text-white font-black text-xs">
                    {user.nome?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0a2533]">{user.nome}</p>
                    <p className="text-xs text-slate-500 font-medium">{user.email}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase bg-green-100 text-green-800`}>
                  {user.status || "ATIVO"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
