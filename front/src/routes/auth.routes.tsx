import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Genre } from "../pages/Genre"
import { Home } from "../pages/Home"
import { MinhasListas } from "../pages/MyList"
import { NotFound } from "../pages/NotFound"
import { Movie } from "../pages/Personagem"
import { Teste } from "../pages/Teste"

export function AuthRoutes() {
  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/listas" element={<MinhasListas />} />
      <Route path="/generos" element={<Genre />} />
      <Route path="/filme/:id" element={<Movie />} />

      <Route path="/teste" element={<Teste />} />

      <Route path="/*" element={<NotFound />} />
    </Routes>


  )
}


