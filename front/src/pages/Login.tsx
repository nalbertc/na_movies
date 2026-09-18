import { AlertCircle, ArrowRight, Film, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Preencha todos os campos para continuar.");
      return;
    }

    try {
      setLoading(true);
      // Ajuste para a rota de login do seu backend
      const response = await api.post("/login", { email, password });

      // Exemplo salvando token se houver
      if (response.data.token) {
        localStorage.setItem("@NAMovies:token", response.data.token);
      }

      navigate("/");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Credenciais inválidas. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-950 px-4 relative overflow-hidden">
      {/* Efeito de luz de fundo */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 p-8 rounded-3xl shadow-2xl relative z-10 flex flex-col gap-6">

        {/* Logo topo */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30 mb-1">
            <Film size={26} className="fill-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-wider">NA<span className="text-red-600">MOVIES</span></h1>
          <p className="text-xs text-zinc-400">Entre na sua conta para acessar seus favoritos</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-xl flex items-center gap-2">
            <AlertCircle size={16} className="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-300">E-mail</label>
            <div className="relative flex items-center">
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-950 text-zinc-200 placeholder-zinc-600 text-sm pl-11 pr-4 py-3 rounded-xl border border-zinc-800 focus:outline-none focus:border-red-600 transition-all"
              />
              <Mail size={18} className="absolute left-3.5 text-zinc-500" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-300">Senha</label>
            <div className="relative flex items-center">
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-950 text-zinc-200 placeholder-zinc-600 text-sm pl-11 pr-4 py-3 rounded-xl border border-zinc-800 focus:outline-none focus:border-red-600 transition-all"
              />
              <Lock size={18} className="absolute left-3.5 text-zinc-500" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? "Entrando..." : <>Entrar <ArrowRight size={16} /></>}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-zinc-800/80">
          <p className="text-xs text-zinc-500">
            Ainda não tem uma conta? <a href="/cadastro" className="text-red-500 font-semibold hover:underline">Cadastre-se</a>
          </p>
        </div>

      </div>
    </div>
  );
}