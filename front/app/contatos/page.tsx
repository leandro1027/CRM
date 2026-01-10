"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/src/services/api";
import { 
  Building2, 
  UserPlus, 
  FileText, 
  CheckCircle2, 
  Search,
  Trash2,
  AlertTriangle
} from "lucide-react";

export default function ContatosPage() {
  const [contatos, setContatos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  
  // Atualizado: Estado agora inclui cnpj
  const [manual, setManual] = useState({ nome: "", telefone: "", cnpj: "" });
  const [buscando, setBuscando] = useState(false);

  // -------- LISTAR CONTATOS ----------
  const carregarContatos = async () => {
    setLoading(true);
    try {
      const res = await api.get("/contatos");
      setContatos(Array.isArray(res.data) ? res.data : res.data?.items || []);
    } catch (err) {
      console.error("Erro ao carregar base:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { carregarContatos(); }, []);

  // -------- MÁSCARAS ----------
  const aplicarMascaraTelefone = (valor: string) => {
    return valor
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  };

  const aplicarMascaraCnpj = (valor: string) => {
    return valor
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  // -------- IMPORTAR TXT ----------
  const importarTxt = async () => {
    if (!file) return alert("Selecione um arquivo .txt primeiro.");
    const form = new FormData();
    form.append("file", file);
    try {
      await api.post("/contatos/importar-txt", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Lista importada com sucesso!");
      setFile(null);
      carregarContatos();
    } catch (e) { 
      alert("Erro ao processar TXT. Verifique o padrão: Nome, CNPJ, Telefone."); 
    }
  };

  // -------- CRIAR LEAD MANUAL ----------
  const criarManual = async () => {
    const telefoneLimpo = manual.telefone.replace(/\D/g, "");
    const cnpjLimpo = manual.cnpj.replace(/\D/g, "");

    if (!manual.nome.trim() || telefoneLimpo.length < 10) {
      return alert("Preencha o nome e um telefone válido com DDD.");
    }

    try {
      await api.post("/contatos", {
        nome: manual.nome.toUpperCase(),
        telefone: telefoneLimpo,
        cnpj: cnpjLimpo, // Enviando CNPJ limpo para o backend
        origem: "MANUAL" 
      });
      
      alert("Lead salvo com sucesso!");
      setManual({ nome: "", telefone: "", cnpj: "" });
      carregarContatos();
    } catch (e: any) { 
      const msg = e.response?.data?.message || "Erro ao salvar contato.";
      alert("Falha: " + (Array.isArray(msg) ? msg[0] : msg)); 
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col">
        <h1 className="text-3xl font-extrabold text-[#0a2533] tracking-tight italic">Gestão de Contatos</h1>
        <p className="text-[11px] text-[#4a707a] uppercase tracking-[0.2em] font-bold mt-1">Atualizar base de contatos Pedroso Automação</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Card: Importação TXT */}
        <div className="bg-[#0a2533] p-8 rounded-3xl text-white relative overflow-hidden shadow-xl flex flex-col justify-between">
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-2">
              <div className="h-4 w-1 bg-[#4a707a] rounded-full"></div>
              <h2 className="text-sm font-black uppercase tracking-widest text-white">Importação em Massa (.TXT)</h2>
            </div>
            
            <p className="text-sm text-slate-300 font-medium leading-relaxed">
              Upload automatizado. O padrão deve ser: <br/>
              <span className="text-[#4a707a] font-bold italic underline underline-offset-4">Nome, CNPJ e Telefone (um por linha).</span>
            </p>

            <div className="space-y-4 pt-4">
              <div className="bg-white/5 border border-dashed border-white/20 p-4 rounded-2xl">
                <input 
                  type="file" 
                  accept=".txt" 
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-white file:text-[#0a2533] cursor-pointer"
                />
              </div>
              <button 
                onClick={importarTxt}
                className="w-full bg-white text-[#0a2533] text-xs font-black uppercase tracking-[0.2em] py-4 rounded-full transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
              >
                Iniciar Processamento
              </button>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#4a707a]/20 rounded-full blur-3xl"></div>
        </div>

        {/* Card: Cadastro Manual Atualizado */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-4 w-1 bg-[#0a2533] rounded-full"></div>
            <h2 className="text-sm font-black text-[#0a2533] uppercase tracking-widest">Novo Lead Manual</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-widest">Nome da Empresa</label>
              <input
                value={manual.nome}
                onChange={(e) => setManual({ ...manual, nome: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm text-[#0a2533] focus:outline-none focus:ring-2 focus:ring-[#4a707a]/20 font-bold transition-all"
                placeholder="Ex: RAZÃO SOCIAL LTDA"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-widest">CNPJ (Opcional)</label>
                <input
                  value={manual.cnpj}
                  onChange={(e) => setManual({ ...manual, cnpj: aplicarMascaraCnpj(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm text-[#0a2533] focus:outline-none focus:ring-2 focus:ring-[#4a707a]/20 font-bold transition-all"
                  placeholder="00.000.000/0000-00"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-widest">Telefone</label>
                <input
                  value={manual.telefone}
                  onChange={(e) => setManual({ ...manual, telefone: aplicarMascaraTelefone(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm text-[#0a2533] focus:outline-none focus:ring-2 focus:ring-[#4a707a]/20 font-bold transition-all"
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>
          </div>

          <button 
            onClick={criarManual}
            className="w-full border-2 border-[#0a2533] text-[#0a2533] hover:bg-[#0a2533] hover:text-white text-xs font-black uppercase tracking-[0.2em] py-4 rounded-full transition-all active:scale-95 shadow-sm"
          >
            Confirmar e Salvar
          </button>
        </div>

        {/* Prospecção API - Não Funcional */}
        <div className="lg:col-span-2 bg-slate-50/50 p-6 rounded-[2rem] border border-slate-200 opacity-60">
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2 text-slate-400">
              <Building2 size={16} />
              <h2 className="text-[10px] font-black uppercase tracking-widest italic">Consulta API, em produção...</h2>
            </div>
            <AlertTriangle size={14} className="text-slate-300" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pointer-events-none grayscale">
            <input disabled placeholder="CNAE" className="bg-white border border-slate-100 rounded-xl px-4 py-2 text-[10px] font-bold" />
            <input disabled placeholder="UF" className="bg-white border border-slate-100 rounded-xl px-4 py-2 text-[10px] font-bold" />
            <input disabled placeholder="CIDADE" className="bg-white border border-slate-100 rounded-xl px-4 py-2 text-[10px] font-bold" />
            <button disabled className="bg-slate-100 text-slate-300 py-2 rounded-xl text-[10px] font-black uppercase">Bloqueado</button>
          </div>
        </div>
      </div>

      {/* Tabela de Resultados */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mt-8">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
          <p className="font-black text-[#0a2533] text-[11px] uppercase tracking-[0.2em]">Base de Dados Sincronizada</p>
          <span className="text-[10px] font-black text-[#4a707a] uppercase bg-white px-4 py-1.5 rounded-full border border-slate-100">
            Total: {contatos.length} leads
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td className="p-16 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Sincronizando base de dados...</td></tr>
              ) : contatos.length > 0 ? (
                contatos.map((c: any) => (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-10 py-5">
                      <div className="flex items-center gap-5">
                        <div className="h-11 w-11 rounded-full bg-[#0a2533] flex items-center justify-center text-white font-black text-xs shadow-lg">
                          {c.nome?.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-black text-[#0a2533] uppercase">{c.nome}</p>
                          <p className="text-[10px] text-slate-400 font-bold">CNPJ: {c.cnpj || "---"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-5 text-xs font-bold text-slate-600">{c.telefone}</td>
                    <td className="px-10 py-5 text-right">
                      <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase text-green-700 bg-green-50 px-4 py-1.5 rounded-full border border-green-100/50">
                        <CheckCircle2 size={10} strokeWidth={3} /> Sincronizado
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td className="p-16 text-center text-slate-400 italic text-sm font-bold uppercase tracking-widest">Nenhum lead encontrado</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}