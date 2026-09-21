import {
  ArrowLeft,
  Bookmark,
  Calendar,
  Clock,
  Film,
  Heart,
  Play,
  Share2,
  Star
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { api } from "../services/api";

// Interface detalhada para um filme único (ajuste caso sua API retorne campos extras)
export interface MovieDetail {
  id: number;
  title: string;
  original_title?: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  vote_count?: number;
  runtime?: number; // Duração em minutos
  release_date: string;
  budget?: number;
  revenue?: number;
  genres?: { id: number; name: string }[];
  status?: string;
}

export function Movie() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCurtido, setIsCurtido] = useState(false);
  const [isSalvo, setIsSalvo] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Sempre rola para o topo ao carregar a página de detalhes
    (async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/movies/tmdb/${id}`);

        api.post(`/interaction?id=${id}&type=VIEW`)

        setMovie(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // Função para formatar minutos em horas e minutos (ex: 125 min -> 2h 05m)
  const formatRuntime = (minutes?: number) => {
    if (!minutes) return "N/D";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Função para formatar valores em Dólar
  const formatCurrency = (amount?: number) => {
    if (!amount || amount === 0) return "Não informado";
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-zinc-950 text-zinc-100 selection:bg-red-600 selection:text-white">
      <Header />

      <main className="flex-1 w-full flex flex-col items-center pb-20">
        {loading ? (
          <div className="h-[70vh] w-full flex items-center justify-center">
            <Loading />
          </div>
        ) : movie ? (
          <div className="w-full flex flex-col items-center">

            {/* 1. HERO COM BANNER / BACKDROP DE FUNDO */}
            <div className="relative w-full h-[450px] md:h-[580px] overflow-hidden bg-zinc-950">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/30 z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-zinc-950 z-10" />

              {movie.backdrop_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover object-center filter brightness-90"
                />
              ) : (
                <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-600">
                  <Film size={64} />
                </div>
              )}

              {/* Botão Voltar Flutuante */}
              <div className="absolute top-6 left-6 md:left-12 z-20">
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 bg-zinc-900/80 hover:bg-zinc-800 text-white px-4 py-2 rounded-xl backdrop-blur-md border border-zinc-700/60 transition-all cursor-pointer shadow-lg text-sm font-medium"
                >
                  <ArrowLeft size={16} /> Voltar
                </button>
              </div>
            </div>

            {/* 2. CONTEÚDO PRINCIPAL (SOBREPOSTO AO HERO) */}
            <div className="max-w-7xl w-full px-4 md:px-8 -mt-40 md:-mt-48 z-20 flex flex-col md:flex-row gap-8 items-start">

              {/* Poster do Filme */}
              <div className="w-48 sm:w-64 md:w-72 flex-shrink-0 mx-auto md:mx-0 rounded-2xl overflow-hidden shadow-2xl border-4 border-zinc-900 bg-zinc-900">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  <div className="aspect-[2/3] w-full bg-zinc-800 flex items-center justify-center text-zinc-500">
                    Sem Pôster
                  </div>
                )}
              </div>

              {/* Informações Detalhadas */}
              <div className="flex-1 flex flex-col gap-4 text-left">

                {/* Título e Título Original */}
                <div>
                  <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                    {movie.title}
                  </h1>
                  {movie.original_title && movie.original_title !== movie.title && (
                    <span className="text-sm text-zinc-400 italic">Título original: {movie.original_title}</span>
                  )}
                </div>

                {/* Badges de Metadados (Nota, Duração, Data, Status) */}
                <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-zinc-300">
                  {movie.vote_average > 0 && (
                    <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-400 px-3 py-1.5 rounded-lg border border-amber-500/20 font-bold">
                      <Star size={15} className="fill-amber-400" />
                      <span>{movie.vote_average.toFixed(1)}</span>
                      {movie.vote_count && <span className="text-zinc-500 text-xs">({movie.vote_count} votos)</span>}
                    </div>
                  )}

                  {movie.runtime && movie.runtime > 0 && (
                    <div className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
                      <Clock size={15} className="text-red-500" />
                      <span>{formatRuntime(movie.runtime)}</span>
                    </div>
                  )}

                  {movie.release_date && (
                    <div className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
                      <Calendar size={15} className="text-red-500" />
                      <span>{new Date(movie.release_date).toLocaleDateString("pt-BR")}</span>
                    </div>
                  )}

                  {movie.status && (
                    <span className="bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 text-zinc-400">
                      {movie.status}
                    </span>
                  )}
                </div>

                {/* Gêneros */}
                {movie.genres && movie.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-medium px-3 py-1 rounded-full transition-colors"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Botões de Ação (Assistir Trailer, Curtir, Salvar, Compartilhar) */}
                <div className="flex flex-wrap items-center gap-4 pt-3">
                  <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-red-600/30 cursor-pointer">
                    <Play size={18} className="fill-white" /> Assistir Trailer
                  </button>

                  <button
                    onClick={() => setIsCurtido(!isCurtido)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-2 ${isCurtido
                      ? "bg-red-600 border-red-600 text-white shadow-md shadow-red-600/30"
                      : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                      }`}
                    title="Curtir Filme"
                  >
                    <Heart size={18} className={isCurtido ? "fill-white" : ""} />
                    <span className="text-xs font-medium hidden sm:inline">{isCurtido ? "Curtido" : "Curtir"}</span>
                  </button>

                  <button
                    onClick={() => setIsSalvo(!isSalvo)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-2 ${isSalvo
                      ? "bg-amber-500 border-amber-500 text-zinc-950 shadow-md shadow-amber-500/30 font-semibold"
                      : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                      }`}
                    title="Salvar na Watchlist"
                  >
                    <Bookmark size={18} className={isSalvo ? "fill-zinc-950" : ""} />
                    <span className="text-xs font-medium hidden sm:inline">{isSalvo ? "Salvo" : "Salvar"}</span>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Link copiado para a área de transferência!");
                    }}
                    className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all cursor-pointer"
                    title="Compartilhar"
                  >
                    <Share2 size={18} />
                  </button>
                </div>

                {/* Sinopse */}
                <div className="pt-4 flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-white">Sinopse</h3>
                  <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                    {movie.overview || "Nenhuma sinopse disponível para este filme no momento."}
                  </p>
                </div>

                {/* Informações Extras (Orçamento e Receita) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-zinc-900 mt-2">
                  <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-900 flex flex-col gap-1">
                    <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Orçamento</span>
                    <span className="text-sm font-bold text-zinc-200">{formatCurrency(movie.budget)}</span>
                  </div>

                  <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-900 flex flex-col gap-1">
                    <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Receita Mundial</span>
                    <span className="text-sm font-bold text-zinc-200">{formatCurrency(movie.revenue)}</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        ) : (
          <div className="w-full h-[50vh] flex flex-col items-center justify-center gap-4 text-zinc-400">
            <p>Não foi possível carregar os detalhes deste filme.</p>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors"
            >
              Voltar para a Home
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}