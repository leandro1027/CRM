"use client";

import React from "react";
import { Plus, MoreVertical, MessageCircle, Phone, Mail } from "lucide-react";

export default function KanbanContatos() {
  const columns = [
    {
      id: 1,
      title: "Novo Lead",
      border: "border-t-[#0a2533]",
      items: [
        { id: "c1", name: "Maria Silva", tag: "WhatsApp", info: "Pedido de orçamento", icon: <MessageCircle size={12} /> },
        { id: "c2", name: "João Pedro", tag: "Instagram", info: "Solicitou contato", icon: <MessageCircle size={12} /> }
      ]
    },
    {
      id: 2,
      title: "Em negociação",
      border: "border-t-orange-500",
      items: [
        { id: "c3", name: "Ana Paula", tag: "Ligação", info: "Aguardando retorno", icon: <Phone size={12} /> },
        { id: "c4", name: "Lucas Almeida", tag: "Email", info: "Proposta enviada", icon: <Mail size={12} /> }
      ]
    },
    {
      id: 3,
      title: "Cliente Ativo",
      border: "border-t-green-600",
      items: [
        { id: "c5", name: "Fernanda Costa", tag: "Contrato", info: "Plano mensal", icon: <Plus size={12} /> }
      ]
    },
    {
      id: 4,
      title: "Perdido",
      border: "border-t-slate-300",
      items: [
        { id: "c6", name: "Rafael Santos", tag: "Sem resposta", info: "Cancelou negociação", icon: <Plus size={12} /> }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-3xl font-extrabold text-[#0a2533] tracking-tight">Pipeline de Vendas</h1>
          <p className="text-[11px] text-[#4a707a] uppercase tracking-[0.2em] font-bold mt-1">Gestão de Leads e Conversão</p>
        </div>

        <button className="bg-[#0a2533] hover:bg-[#163a4d] text-white text-xs font-black uppercase tracking-widest px-8 py-3 rounded-full transition-all shadow-md active:scale-95">
          + Novo Lead
        </button>
      </div>

      {/* Container das Colunas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {columns.map((col) => (
          <div key={col.id} className={`bg-slate-100/40 rounded-3xl p-4 border-t-4 ${col.border} flex flex-col min-h-[600px] shadow-sm`}>
            
            {/* Header da Coluna */}
            <div className="flex items-center justify-between mb-6 px-2">
              <h2 className="text-xs font-black text-[#0a2533] uppercase tracking-widest">{col.title}</h2>
              <span className="bg-white text-[#0a2533] text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-200 shadow-sm">
                {col.items.length}
              </span>
            </div>

            {/* Lista de Cards */}
            <div className="space-y-4 flex-1">
              {col.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:border-[#4a707a]/40 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md flex items-center gap-1 ${
                        item.tag === 'WhatsApp' ? 'bg-green-50 text-green-700' : 
                        item.tag === 'Ligação' ? 'bg-blue-50 text-blue-700' : 'bg-slate-50 text-slate-600'
                    }`}>
                      {item.icon} {item.tag}
                    </div>
                    <MoreVertical size={14} className="text-slate-300 group-hover:text-[#0a2533]" />
                  </div>

                  <p className="font-black text-[#0a2533] text-sm mb-1">{item.name}</p>
                  <p className="text-[11px] text-slate-500 font-medium leading-tight">{item.info}</p>
                  
                  <div className="mt-4 pt-3 border-t border-slate-50 flex justify-between items-center">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Ver detalhes</span>
                    <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-[#0a2533]">
                        {item.name.charAt(0)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Botão de Rodapé da Coluna */}
            <button className="mt-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#0a2533] transition-colors py-2 border-2 border-dashed border-slate-200 rounded-2xl hover:bg-white hover:border-[#0a2533]">
              + Adicionar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}