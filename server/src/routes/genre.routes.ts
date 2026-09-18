import { Router } from "express";
import GenreController from "../controllers/GenreController";

export const genreRoutes = Router();

// genreRoutes.get("/", NewsController.allMovies);
genreRoutes.get("/tmdb", GenreController.allGenreTMBD);
// genreRoutes.get("/tmdb/:movieId", NewsController.viewMovie);
