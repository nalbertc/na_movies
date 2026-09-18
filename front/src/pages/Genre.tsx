

import { ChevronRight, Compass, Film } from "lucide-react";
import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { api } from "../services/api";

export interface IGenre {
  id: number;
  name: string;
}

export function Genre() {
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // Exemplo de rota, ajuste conforme a sua API backend
        const { data } = await api.get("/genres/tmdb");
        setGenres(data.genres || data);
      } catch (error) {
        console.error("Erro ao buscar gêneros:", error);
        // Fallback de exemplo caso a rota ainda não exista no backend
        setGenres([
          { id: 28, name: "Ação" },
          { id: 12, name: "Aventura" },
          { id: 16, name: "Animação" },
          { id: 35, name: "Comédia" },
          { id: 80, name: "Crime" },
          { id: 18, name: "Drama" },
          { id: 14, name: "Fantasia" },
          { id: 27, name: "Terror" },
          { id: 10749, name: "Romance" },
          { id: 878, name: "Ficção Científica" }
        ]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-zinc-950 text-zinc-100">
      <Header />

      <main className="flex-1 max-w-7xl w-full px-4 md:px-8 py-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-500">
            <Compass size={22} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Explorar por Gêneros</h1>
            <p className="text-sm text-zinc-400">Escolha uma categoria para descobrir novos títulos</p>
          </div>
        </div>

        {loading ? (
          <div className="h-[40vh] flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {genres.map((genre) => (
              <a
                key={genre.id}
                href={`/generos/${genre.id}`}
                className="group relative bg-zinc-900 hover:bg-zinc-850 border border-zinc-800/80 hover:border-red-600/50 p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between h-36 shadow-md hover:shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden"
              >
                <div className="absolute -right-4 -bottom-4 text-zinc-800/40 group-hover:text-red-600/10 transition-colors pointer-events-none">
                  <Film size={80} />
                </div>

                <span className="text-xs font-semibold text-red-500 uppercase tracking-widest">Categoria</span>

                <div className="flex items-center justify-between z-10">
                  <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                    {genre.name}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-zinc-800 group-hover:bg-red-600 text-zinc-300 group-hover:text-white flex items-center justify-center transition-colors">
                    <ChevronRight size={16} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}