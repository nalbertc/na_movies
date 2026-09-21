import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Flame,
  Heart,
  Info,
  Play,
  Sparkles,
  Star
} from "lucide-react";
import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export interface Resposta {
  page: number;
  total_results: number;
  total_pages: number;
  results: Result[];
}

export interface Result {
  id: number;
  tmdbId: number
  title: string;
  overview?: string; // Descrição
  backdrop_path: string;
  poster_path: string;
  vote_average?: number; // Nota (ex: 8.5)
  release_date?: string; // Data de lançamento
}

// Tipagem exata da interação retornada pelo backend/Prisma
export interface Interaction {
  id: string;
  type: "LIKE" | "SAVE" | "VIEW" | "SHARE";
  durationSeconds: number | null;
  viewedAt: string | Date | null;
  likedAt: string | Date | null;
  savedAt: string | Date | null;
  shared: string | Date | null;
  userId: string;
  movieId: string;
  createdAt: string | Date;
  movie: Result
}



export function Home() {
  const [dadosFilmes, setDadosFilmes] = useState<Resposta>({} as Resposta);
  const [dadosFilmesCarrocel, setDadosFilmesCarrocel] = useState<Resposta>({} as Resposta);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [loading, setLoading] = useState(true);
  const [buscaDeuCerto, setBuscaDeuCerto] = useState(false);
  const navigation = useNavigate()

  // Estados para interatividade dos cards (Curtidos e Salvos)
  const [curtidos, setCurtidos] = useState<number[]>([]);
  const [salvos, setSalvos] = useState<number[]>([]);

  // Estado para o Carrossel do Topo
  const [carrosselIndex, setCarrosselIndex] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/movies/tmdb?page=${paginaAtual}`);
        setDadosFilmes(data);
        setBuscaDeuCerto(true);
      } catch (error) {
        console.error(error);
        setBuscaDeuCerto(false);
      } finally {
        setLoading(false);
      }
    })();
  }, [paginaAtual]);

  // filmes para o carrocel  
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/movies/tmdb/now_playing`);
        setDadosFilmesCarrocel(data);
        setBuscaDeuCerto(true);
      } catch (error) {
        console.error(error);
        setBuscaDeuCerto(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  // 3. Buscar as interações ativas do usuário para inicializar curtidos/salvos
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/interaction/user");

        // Considera curtido se likedAt não for nulo ou se o type for LIKE
        const idsCurtidos = data
          .filter((item) => item.likedAt !== null || item.type === "LIKE")
          .map((item) => Number(item.movie.tmdbId));

        // Considera salvo se savedAt não for nulo ou se o type for SAVE
        const idsSalvos = data
          .filter((item) => item.savedAt !== null || item.type === "SAVE")
          .map((item) => Number(item.movie.tmdbId));

        setCurtidos(Array.from(new Set(idsCurtidos)));
        setSalvos(Array.from(new Set(idsSalvos)));
      } catch (error) {
        console.error("Erro ao carregar interações do usuário:", error);
      }
    })();
  }, []);



  // Passar o carrossel automaticamente a cada 6 segundos (se houver filmes)
  useEffect(() => {
    if (!dadosFilmesCarrocel.results || dadosFilmesCarrocel.results.length === 0) return;
    const interval = setInterval(() => {
      setCarrosselIndex((prev) => (prev + 1) % Math.min(dadosFilmesCarrocel.results.length, 10));
    }, 6000);
    return () => clearInterval(interval);
  }, [dadosFilmesCarrocel]);

  // Funções de Curtir e Salvar
  const toggleCurtir = (id: number) => {
    setCurtidos((prev) =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleSalvar = (id: number) => {
    setSalvos((prev) =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  function handleInteraction(id: number, type: "LIKE" | "SAVE" | "VIEW" | "SHARE") {
    try {
      const data = api.post(`/interaction?id=${id}&type=${type}`,)

      console.log(data)

    } catch (error) {

    }
  }

  // Filme em destaque atual no carrossel
  const filmeDestaque = dadosFilmesCarrocel.results?.[carrosselIndex];

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-zinc-950 text-zinc-100">
      <Header />

      <main className="flex-1 max-w-7xl w-full pb-16">
        {loading ? (
          <div className="h-[70vh] flex items-center justify-center">
            <Loading />
          </div>
        ) : buscaDeuCerto && dadosFilmes.results ? (
          <>
            {/* 1. CARROSSEL DE DESTAQUE NO TOPO */}
            {filmeDestaque && (
              <section className="relative w-full h-[480px] md:h-[560px] overflow-hidden rounded-b-3xl shadow-2xl mb-12">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent z-10" />

                <img
                  src={`https://image.tmdb.org/t/p/w1280/${filmeDestaque.backdrop_path}`}
                  alt={filmeDestaque.title}
                  className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
                />

                <div className="absolute bottom-10 left-6 md:left-12 z-20 max-w-2xl flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                      <Sparkles size={12} /> Destaque
                    </span>
                    {filmeDestaque.vote_average && (
                      <span className="flex items-center gap-1 bg-zinc-900/80 backdrop-blur-md text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-zinc-700">
                        <Star size={12} className="fill-amber-400" /> {filmeDestaque.vote_average.toFixed(1)}
                      </span>
                    )}
                  </div>

                  <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
                    {filmeDestaque.title}
                  </h1>

                  <p className="text-zinc-300 text-sm md:text-base line-clamp-3 leading-relaxed">
                    {filmeDestaque.overview || "Explore este grande sucesso do cinema diretamente na nossa plataforma. Descubra detalhes, avaliações e muito mais."}
                  </p>

                  <div className="flex items-center gap-4 pt-2">
                    <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-xl transition-all shadow-lg shadow-red-600/30 cursor-pointer">
                      <Play size={18} className="fill-white" /> Assistir Trailer
                    </button>
                    <button className="flex items-center gap-2 bg-zinc-800/80 hover:bg-zinc-700 text-white font-medium px-5 py-3 rounded-xl backdrop-blur-md transition-all border border-zinc-700 cursor-pointer">
                      <Info size={18} /> Detalhes
                    </button>
                  </div>
                </div>

                {/* Controles do Carrossel */}
                <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
                  <button
                    onClick={() => setCarrosselIndex((prev) => (prev === 0 ? 4 : prev - 1))}
                    className="p-2.5 rounded-full bg-zinc-900/70 hover:bg-red-600 text-white backdrop-blur-md border border-zinc-700 transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setCarrosselIndex((prev) => (prev + 1) % 10)}
                    className="p-2.5 rounded-full bg-zinc-900/70 hover:bg-red-600 text-white backdrop-blur-md border border-zinc-700 transition-colors cursor-pointer"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </section>
            )}

            {/* SEÇÃO: EM CARTAZ / FILMES */}
            <section className="px-4 md:px-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Flame className="text-red-500" size={24} />
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight">Em Cartaz & Populares</h2>
                </div>
                <span className="text-xs text-zinc-400 font-medium">Página {paginaAtual} de {dadosFilmes.total_pages}</span>
              </div>

              {/* GRID DE CARDS */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {dadosFilmes.results.map((result) => {
                  const isCurtido = curtidos.includes(result.id);
                  const isSalvo = salvos.includes(result.id);

                  return (
                    <div
                      key={result.id}
                      className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 flex flex-col shadow-md hover:shadow-xl hover:-translate-y-1"
                    >
                      {/* Poster do Filme com Ações Flutuantes */}
                      <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-950">
                        <img
                          src={`https://image.tmdb.org/t/p/w342/${result.poster_path}`}
                          alt={result.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Overlay Gradiente no Hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                          <button className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-md" onClick={() => navigation(`/filme/${result.id}`)}>
                            <Play size={14} className="fill-white" /> Ver Detalhes
                          </button>
                        </div>

                        {/* Botões de Curtir e Salvar no Topo do Card */}
                        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleCurtir(result.id); handleInteraction(result.id, "LIKE") }}
                            className={`p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${isCurtido
                              ? "bg-red-600 text-white scale-110 shadow-md shadow-red-600/40"
                              : "bg-zinc-900/70 text-zinc-300 hover:text-white hover:bg-zinc-800"
                              }`}
                            title="Curtir"
                          >
                            <Heart size={15} className={isCurtido ? "fill-white" : ""} />
                          </button>

                          <button
                            onClick={(e) => { e.stopPropagation(); toggleSalvar(result.id); handleInteraction(result.id, "SAVE") }}
                            className={`p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${isSalvo
                              ? "bg-amber-500 text-zinc-950 scale-110 shadow-md shadow-amber-500/40"
                              : "bg-zinc-900/70 text-zinc-300 hover:text-white hover:bg-zinc-800"
                              }`}
                            title="Salvar na Watchlist"
                          >
                            <Bookmark size={15} className={isSalvo ? "fill-zinc-950" : ""} />
                          </button>
                        </div>

                        {/* Badge de Nota */}
                        {result.vote_average && (
                          <div className="absolute top-2.5 left-2.5 bg-zinc-900/80 backdrop-blur-md text-amber-400 text-xs font-bold px-2 py-1 rounded-md border border-zinc-700/50 flex items-center gap-1">
                            <Star size={11} className="fill-amber-400" />
                            {result.vote_average.toFixed(1)}
                          </div>
                        )}
                      </div>

                      {/* Informações do Filme */}
                      <div className="p-3.5 flex flex-col flex-1 justify-between">
                        <h3 className="font-semibold text-sm text-zinc-100 line-clamp-1 group-hover:text-red-500 transition-colors">
                          {result.title}
                        </h3>
                        <div className="flex items-center justify-between mt-2 text-xs text-zinc-400">
                          <span>{result.release_date ? result.release_date.split("-")[0] : "Lançamento"}</span>
                          <span className="bg-zinc-800 px-2 py-0.5 rounded text-[10px] text-zinc-300">Filme</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Paginação Simples */}
              <div className="flex items-center justify-center gap-4 mt-10">
                <button
                  onClick={() => setPaginaAtual(prev => Math.max(prev - 1, 1))}
                  disabled={paginaAtual === 1}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed border border-zinc-800 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                >
                  Anterior
                </button>
                <span className="text-sm font-semibold text-zinc-300">Página {paginaAtual}</span>
                <button
                  onClick={() => setPaginaAtual(prev => prev + 1)}
                  disabled={paginaAtual >= dadosFilmes.total_pages}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed border border-zinc-800 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                >
                  Próxima
                </button>
              </div>
            </section>
          </>
        ) : (
          <div className="w-full h-[50vh] flex items-center justify-center text-zinc-400">
            Falha ao carregar os dados. Tente novamente mais tarde.
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}