import "./globals.css";
import Sidebar from "../src/components/sidebar";
import Header from "../src/components/header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      {/* 1. bg-[#f8fafc] garante que o fundo seja o cinza claríssimo do site */}
      {/* 2. min-h-screen evita que o fundo "acabe" se a página for pequena */}
      <body className="flex bg-[#f8fafc] text-[#0a2533] min-h-screen antialiased">
        
        {/* Sidebar fixa na lateral */}
        <Sidebar />

        {/* Container principal */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          
          <Header />

          {/* 3. Área de conteúdo com scroll próprio para não mover o Header/Sidebar */}
          {/* 4. Retiramos o excesso de padding que causava o "box" estranho */}
          <main className="flex-1 overflow-y-auto bg-[#f8fafc] p-4 md:p-8">
            <div className="max-w-[1600px] mx-auto">
              {children}
            </div>
          </main>
          
        </div>
      </body>
    </html>
  );
}