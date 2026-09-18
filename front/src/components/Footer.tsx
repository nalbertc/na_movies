import { Film, Heart } from "lucide-react";

import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa6";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-900 text-zinc-400 flex flex-col items-center pt-16 pb-8">
      <div className="max-w-7xl w-full px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

        {/* Coluna 1: Sobre */}
        <div className="flex flex-col gap-4 md:col-span-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white">
              <Film size={18} className="fill-white" />
            </div>
            <span className="font-extrabold text-white tracking-wider">NA<span className="text-red-600">MOVIES</span></span>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Sua plataforma definitiva para descobrir filmes em cartaz, explorar trailers, verificar notas e organizar sua lista pessoal de favoritos.
          </p>
          <div className="flex items-center gap-3 text-zinc-400">
            <a href="#" className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 hover:text-white transition-colors"><FaGithub size={16} /></a>
            <a href="#" className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 hover:text-white transition-colors"><FaInstagram size={16} /></a>
            <a href="#" className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 hover:text-white transition-colors"><FaTwitter size={16} /></a>
          </div>
        </div>

        {/* Coluna 2: Navegação */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Navegação</h4>
          <a href="/" className="text-xs hover:text-red-500 transition-colors">Página Inicial</a>
          <a href="/generos" className="text-xs hover:text-red-500 transition-colors">Explorar Gêneros</a>
          <a href="/favoritos" className="text-xs hover:text-red-500 transition-colors">Watchlist (Salvos)</a>
          <a href="/lancamentos" className="text-xs hover:text-red-500 transition-colors">Próximos Lançamentos</a>
        </div>

        {/* Coluna 3: Legal & Ajuda */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Ajuda e Legal</h4>
          <a href="#" className="text-xs hover:text-red-500 transition-colors">Termos de Uso</a>
          <a href="#" className="text-xs hover:text-red-500 transition-colors">Política de Privacidade</a>
          <a href="#" className="text-xs hover:text-red-500 transition-colors">Central de Ajuda</a>
          <a href="#" className="text-xs hover:text-red-500 transition-colors">API do TMDB</a>
        </div>

        {/* Coluna 4: Newsletter / Destaque */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Fique por dentro</h4>
          <p className="text-xs text-zinc-500">Receba notificações de filmes em alta diretamente no seu e-mail.</p>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="email"
              placeholder="Seu e-mail"
              className="bg-zinc-900 text-xs px-3 py-2 rounded-lg border border-zinc-800 text-zinc-200 focus:outline-none focus:border-red-600 flex-1"
            />
            <button className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer">
              Assinar
            </button>
          </div>
        </div>

      </div>

      {/* Linha de Copyright */}
      <div className="max-w-7xl w-full px-4 md:px-8 border-t border-zinc-900/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
        <p>© {currentYear} NA Movies. Todos os direitos reservados.</p>
        <p className="flex items-center gap-1">
          Feito com <Heart size={13} className="text-red-600 fill-red-600" /> usando dados do TMDB.
        </p>
      </div>
    </footer>
  );
}