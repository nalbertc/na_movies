import { Footer } from "../components/Footer"
import { Header } from "../components/Header"

export function NotFound() {
  return (
    <div className="flex flex-col h-screen w-full items-center">
      <Header />

      <main className="flex-1 max-w-5xl w-full ">
        Página não encontrada
      </main>

      <Footer />
    </div>
  )
}


