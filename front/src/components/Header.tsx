import { Bell, Bookmark, Film, Search } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <header className="sticky top-0 z-50 h-20 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 flex justify-center transition-all">
      <div className="h-full max-w-7xl w-full flex items-center px-4 md:px-8 justify-between gap-6">

        {/* LOGO */}
        <a href="/" className="flex items-center gap-2.5 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30 group-hover:bg-red-500 transition-colors">
            <Film size={22} className="fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg text-white tracking-wider">NA<span className="text-red-600">MOVIES</span></span>
            <span className="text-[10px] text-zinc-400 font-medium -mt-1 tracking-widest uppercase">Streaming</span>
          </div>
        </a>

        {/* INPUT DE BUSCA */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-md relative">
          <input
            type="text"
            placeholder="Pesquisar filmes, séries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900 text-zinc-200 placeholder-zinc-500 text-sm pl-11 pr-4 py-2.5 rounded-xl border border-zinc-800 focus:outline-none focus:border-red-600 transition-all shadow-inner"
          />
          <button type="submit" className="absolute left-3.5 text-zinc-500 hover:text-zinc-300 transition-colors">
            <Search size={18} />
          </button>
        </form>

        {/* NAVEGAÇÃO E AÇÕES */}
        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex items-center gap-8 font-medium text-sm text-zinc-300">
            <a href="/" className="text-white hover:text-red-500 transition-colors">Início</a>
            <a href="/generos" className="hover:text-red-500 transition-colors">Gêneros</a>
            <a href="/favoritos" className="hover:text-red-500 transition-colors flex items-center gap-1.5">
              <Bookmark size={15} /> Minha Lista
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors border border-zinc-800 relative cursor-pointer" title="Notificações">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-600" />
            </button>

            {/* Avatar do Usuário */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 p-0.5 shadow-md cursor-pointer hover:opacity-90 transition-opacity">
              <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center font-bold text-xs text-white">
                NA
              </div>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}