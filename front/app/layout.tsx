import "./globals.css";
import Sidebar from "../src/components/sidebar";
import Header from "../src/components/header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="flex bg-[#f8fafc] text-[#0a2533] min-h-screen antialiased overflow-hidden">
        
        {/* A Sidebar agora controla sua própria largura. 
            O Flexbox (className="flex" no body) faz o resto do trabalho.
        */}
        <Sidebar />

        {/* Container principal:
            - flex-1: Ocupa todo o espaço restante ao lado da sidebar.
            - transition-all: Faz com que o redimensionamento do conteúdo seja suave junto com a sidebar.
        */}
        <div className="flex-1 flex flex-col h-screen min-w-0 transition-all duration-500 ease-in-out">
          
          <Header />

          {/* Área de conteúdo:
              - overflow-y-auto: Scroll apenas aqui dentro.
              - p-4 md:p-8: Espaçamento que se adapta ao monitor.
          */}
          <main className="flex-1 overflow-y-auto bg-[#f8fafc] p-4 md:p-8">
            <div className="max-w-[1600px] mx-auto w-full">
              {children}
            </div>
          </main>
          
        </div>
      </body>
    </html>
  );
}