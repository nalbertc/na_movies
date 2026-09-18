import { Bookmark, Film, Heart, Play, Trash2 } from "lucide-react";
import { useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export function MinhasListas() {
  const [activeTab, setActiveTab] = useState<"salvos" | "curtidos">("salvos");

  // Dados fictícios simulando filmes salvos/curtidos pelo usuário
  const [filmesSalvos, setFilmesSalvos] = useState([
    { id: 550, title: "Clube da Luta", poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg", vote_average: 8.4, release_date: "1999" },
    { id: 278, title: "Um Sonho de Liberdade", poster_path: "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg", vote_average: 8.7, release_date: "1994" }
  ]);

  const [filmesCurtidos, setFilmesCurtidos] = useState([
    { id: 238, title: "O Poderoso Chefão", poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg", vote_average: 8.7, release_date: "1972" }
  ]);

  const removerSalvo = (id: number) => {
    setFilmesSalvos(prev => prev.filter(f => f.id !== id));
  };

  const removerCurtido = (id: number) => {
    setFilmesCurtidos(prev => prev.filter(f => f.id !== id));
  };

  const listaAtual = activeTab === "salvos" ? filmesSalvos : filmesCurtidos;

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-zinc-950 text-zinc-100">
      <Header />

      <main className="flex-1 max-w-7xl w-full px-4 md:px-8 py-10">

        {/* Cabeçalho e Abas */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Minhas Listas</h1>
            <p className="text-sm text-zinc-400">Gerencie seus filmes salvos e favoritos</p>
          </div>

          <div className="flex items-center bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800 self-start">
            <button
              onClick={() => setActiveTab("salvos")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "salvos"
                ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                : "text-zinc-400 hover:text-white"
                }`}
            >
              <Bookmark size={15} /> Watchlist ({filmesSalvos.length})
            </button>
            <button
              onClick={() => setActiveTab("curtidos")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "curtidos"
                ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                : "text-zinc-400 hover:text-white"
                }`}
            >
              <Heart size={15} /> Curtidos ({filmesCurtidos.length})
            </button>
          </div>
        </div>

        {/* Listagem dos Itens */}
        {listaAtual.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {listaAtual.map((movie) => (
              <div
                key={movie.id}
                className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 flex flex-col shadow-md"
              >
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-950">
                  <img
                    src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Botão de Remover */}
                  <button
                    onClick={() => activeTab === "salvos" ? removerSalvo(movie.id) : removerCurtido(movie.id)}
                    className="absolute top-2.5 right-2.5 p-2 rounded-full bg-zinc-950/80 hover:bg-red-600 text-zinc-300 hover:text-white backdrop-blur-md transition-colors cursor-pointer shadow-md"
                    title="Remover da lista"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <div className="p-3.5 flex flex-col flex-1 justify-between gap-2">
                  <h3 className="font-semibold text-sm text-zinc-100 line-clamp-1">
                    {movie.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>{movie.release_date}</span>
                    <a
                      href={`/movie/${movie.id}`}
                      className="text-red-500 hover:text-red-400 font-medium flex items-center gap-1"
                    >
                      Ver <Play size={10} className="fill-current" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[40vh] w-full flex flex-col items-center justify-center gap-3 text-zinc-500 border border-dashed border-zinc-800 rounded-3xl">
            <Film size={48} className="text-zinc-700" />
            <p className="text-sm">Sua lista de {activeTab === "salvos" ? "watchlist" : "curtidos"} está vazia.</p>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}