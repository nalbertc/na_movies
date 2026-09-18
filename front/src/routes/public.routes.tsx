import { Route, Routes } from "react-router-dom";


import { Login } from "../pages/Login";
import { NotFound } from "../pages/NotFound";

export function PublicRoutes() {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />

      <Route path="/*" element={<NotFound />} />

    </Routes>
  )
}