import { Router } from "express";
import { autenticationRoutes } from "./routes/autentication.routes";
import { genreRoutes } from "./routes/genre.routes";
import { interactionsRoutes } from "./routes/interaction.routes";
import { movieRoutes } from "./routes/movie.routes";
import { userRoutes } from "./routes/user.routes";

export const routes = Router();

routes.get("/", (req, res) => {
  return res.status(200).json("Hello World!");
});

routes.use(autenticationRoutes);
routes.use("/users", userRoutes);
routes.use("/movies", movieRoutes);
routes.use("/genres", genreRoutes);
routes.use("/", interactionsRoutes);
