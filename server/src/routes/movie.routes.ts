import { Router } from "express";
import NewsController from "../controllers/MoviesController";

export const movieRoutes = Router();

movieRoutes.get("/", NewsController.allMovies);
movieRoutes.get("/tmdb", NewsController.moviesTMDB);
movieRoutes.get("/tmdb/:movieId", NewsController.viewMovie);
movieRoutes.get("/tmdb/now_playing", NewsController.moviesNowPlaying);
