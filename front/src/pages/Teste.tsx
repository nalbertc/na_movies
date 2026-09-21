import { ArrowRight, CloudCog } from "lucide-react"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { AuthContext, useAuth } from "../contexts/AuthContext"
import { api } from "../services/api"
import { useEffect, useState } from "react"
import { Result } from "./Home"

interface IInteraction {
  id: string,
  type: string,
  durationSeconds: null,
  viewedAt: Date | null,
  likedAt: Date | null,
  savedAt: Date | null,
  shared: Date | null,
  userId: string,
  movieId: string,
  createdAt: Date,
  movie: Result
}

export function Teste() {
  const { user } = useAuth()

  const [dadosFilmes, setDadosFilmes] = useState<IInteraction[]>([]);


  useEffect(() => {
    (async () => {
      try {

        const { data } = await api.get(`interaction/user`);
        setDadosFilmes(data);

        console.log(data)

      } catch (error) {
        console.error(error);

      } finally {

      }
    })();
  }, []);



  function handleInteraction() {
    try {
      const data = api.post("/interaction?id=969681&type=LIKE",)


      console.log(data)

    } catch (error) {

    }

  }





  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-zinc-950 text-zinc-100">
      <Header />

      <main className="flex-1 max-w-7xl w-full pb-16">
        {user?.name}


        {
          dadosFilmes.map(item => (
            <div key={item.id}>

              <div>{item.movie.id}</div>
              <div>{item.movie.tmdbId}</div>
              <div>{item.movie.title}</div>
              <div>{item.type}</div>

            </div>
          ))
        }

        { }




        <button
          onClick={() => handleInteraction()}

          className="mt-2 w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowRight size={16} />
        </button>


      </main>

      <Footer />
    </div>
  )
}


