"use client";

import React from "react";

export default function ContatosPage() {
  const contatos = [
    { id: 1, nome: "Carlos Eduardo", telefone: "(42) 99988-7766", empresa: "Pedroso Matrizes", status: "Ativo" },
    { id: 2, nome: "Ana Paula Souza", telefone: "(41) 98877-6655", empresa: "Logística Sul", status: "Pendente" },
    { id: 3, nome: "Marcos Roberto", telefone: "(47) 99112-2334", empresa: "Indústria Metal", status: "Inativo" },
  ];

  return (
    <div className="space-y-8">
      {/* Título e Ações Principais */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-3xl font-extrabold text-[#0a2533] tracking-tight">Contatos</h1>
          <p className="text-[11px] text-[#4a707a] uppercase tracking-[0.2em] font-bold mt-1">Gerenciamento de clientes e leads</p>
        </div>

        <button className="bg-[#0a2533] hover:bg-[#163a4d] text-white text-xs font-black uppercase tracking-widest px-8 py-3 rounded-full transition-all shadow-md active:scale-95">
          + Novo Contato
        </button>
      </div>

      {/* Barra de Busca e Filtros */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0a2533] focus:outline-none focus:ring-2 focus:ring-[#4a707a]/20 focus:border-[#4a707a] transition-all placeholder:text-slate-400 font-medium"
            placeholder="Buscar por nome, telefone ou empresa..."
          />
        </div>
        <button className="bg-slate-100 hover:bg-slate-200 text-[#0a2533] font-bold text-xs uppercase px-6 py-3 rounded-xl transition-colors">
          Filtrar
        </button>
      </div>

      {/* Tabela de Contatos */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Nome / Empresa</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Telefone</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {contatos.map((contato) => (
                <tr key={contato.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-[#0a2533] font-bold text-xs group-hover:bg-[#0a2533] group-hover:text-white transition-all">
                        {contato.nome.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#0a2533]">{contato.nome}</p>
                        <p className="text-[11px] text-slate-500 font-medium">{contato.empresa}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-semibold text-slate-600">
                    {contato.telefone}
                  </td>
                  <td className="px-6 py-5">
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${
                      contato.status === 'Ativo' ? 'bg-green-100 text-green-700' : 
                      contato.status === 'Pendente' ? 'bg-orange-100 text-orange-700' : 
                      'bg-slate-100 text-slate-500'
                    }`}>
                      {contato.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-[#4a707a] hover:text-[#0a2533] font-bold text-[10px] uppercase tracking-tighter transition-colors">
                      Editar
                    </button>
                    <span className="mx-2 text-slate-300">|</span>
                    <button className="text-red-400 hover:text-red-600 font-bold text-[10px] uppercase tracking-tighter transition-colors">
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Paginação Simples */}
        <div className="p-4 bg-slate-50/30 border-t border-slate-100 flex justify-between items-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase">Exibindo 3 de 120 contatos</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-200 rounded-lg text-[10px] font-bold hover:bg-white transition-all">Anterior</button>
            <button className="px-3 py-1 border border-slate-200 rounded-lg text-[10px] font-bold hover:bg-white transition-all">Próximo</button>
          </div>
        </div>
      </div>
    </div>
  );
}