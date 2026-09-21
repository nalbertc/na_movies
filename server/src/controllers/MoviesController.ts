import { Request, Response } from "express";
import z from "zod";
import { prisma } from "../database";
import {
  getMovieById,
  getMoviesNowPlaying,
  getPopularMovies,
} from "../services/tmdb";

export default {
  async allMovies(req: Request, res: Response) {
    try {
      const news = await prisma.movie.findMany();

      return res.status(200).json(news);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },

  async moviesTMDB(req: Request, res: Response) {
    const createReqQuery = z.object({
      page: z.string(),
    });

    try {
      const { page = 1 } = createReqQuery.parse(req.query);

      const data = await getPopularMovies("pt-BR", Number(page));

      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },

  async viewMovie(req: Request, res: Response) {
    const createReqParams = z.object({
      movieId: z.string(),
    });

    try {
      const { movieId } = createReqParams.parse(req.params);

      const data = await getMovieById(movieId);

      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },

  async moviesNowPlaying(req: Request, res: Response) {
    try {
      const data = await getMoviesNowPlaying();

      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },

  async moviesDestak(req: Request, res: Response) {
    const createReqQuery = z.object({
      page: z.string(),
    });

    try {
      const { page = 1 } = createReqQuery.parse(req.query);

      const data = await getPopularMovies("pt-BR", Number(page));

      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },


};
