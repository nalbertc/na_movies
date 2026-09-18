import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Genre } from "../pages/Genre"
import { Home } from "../pages/Home"
import { MinhasListas } from "../pages/MyList"
import { NotFound } from "../pages/NotFound"
import { Movie } from "../pages/Personagem"

export function AuthRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listas" element={<MinhasListas />} />
        <Route path="/generos" element={<Genre />} />
        <Route path="/filme/:id" element={<Movie />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>

    </BrowserRouter>
  )
}


