"use client";

import React from "react";

export default function DisparosPage() {
  return (
    <div className="space-y-8">
      {/* Cabeçalho da Página */}
      <div className="flex flex-col">
        <h1 className="text-3xl font-extrabold text-[#0a2533] tracking-tight">Disparos de Mensagens</h1>
        <p className="text-[11px] text-[#4a707a] uppercase tracking-[0.2em] font-bold mt-1">Automação de comunicações diretas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Coluna 1: Formulário de Configuração */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-4 w-1 bg-[#0a2533] rounded-full"></div>
            <h2 className="text-sm font-black text-[#0a2533] uppercase tracking-widest">Nova Campanha</h2>
          </div>

          <div className="space-y-4">
            {/* Campo de Telefone */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Destinatário (Telefone)</label>
              <input
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-[#0a2533] focus:outline-none focus:ring-2 focus:ring-[#4a707a]/20 focus:border-[#4a707a] transition-all placeholder:text-slate-300 font-medium"
                placeholder="Ex: 5542999998888"
              />
            </div>

            {/* Campo de Mensagem */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Mensagem de Texto</label>
              <textarea
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-[#0a2533] focus:outline-none focus:ring-2 focus:ring-[#4a707a]/20 focus:border-[#4a707a] transition-all placeholder:text-slate-300 font-medium h-40 resize-none"
                placeholder="Digite aqui o conteúdo que será enviado..."
              />
              <p className="text-[9px] text-slate-400 font-bold text-right italic">Dica: Use [nome] para personalizar</p>
            </div>
          </div>

          <button className="w-full bg-[#0a2533] hover:bg-[#163a4d] text-white text-xs font-black uppercase tracking-[0.2em] py-4 rounded-full transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
            🚀 Iniciar Envio
          </button>
        </div>

        {/* Coluna 2: Preview / Dicas Estéticas */}
        <div className="flex flex-col gap-6">
          {/* Card de Informação Estilo Pedroso */}
          <div className="bg-[#0a2533] p-8 rounded-3xl text-white relative overflow-hidden shadow-xl">
            <div className="relative z-10">
              <p className="text-[#4a707a] text-[10px] font-black uppercase tracking-widest mb-2">Dica de Automação</p>
              <h3 className="text-xl font-bold mb-4">Eficiência Master Blue</h3>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                Sempre verifique se a sua lista de contatos está atualizada no banco de dados antes de iniciar disparos em massa.
              </p>
            </div>
            {/* Detalhe visual de luz */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#4a707a]/30 rounded-full blur-3xl"></div>
          </div>

          {/* Histórico Simples de Envios */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex-1">
            <p className="font-black text-[#0a2533] text-[10px] uppercase tracking-widest mb-6 border-b border-slate-100 pb-4">Últimos Disparos</p>
            <div className="space-y-4">
              {[
                { tel: "(42) 9991-2233", status: "Enviado", time: "Há 5 min" },
                { tel: "(41) 9882-4455", status: "Processando", time: "Agora" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div>
                    <p className="text-sm font-bold text-[#0a2533]">{item.tel}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{item.time}</p>
                  </div>
                  <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase ${item.status === 'Enviado' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700 animate-pulse'}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}