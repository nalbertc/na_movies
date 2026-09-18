import { Request, Response } from "express";
import { getMovieGenres } from "../services/tmdb";

export default {
  async allGenreTMBD(req: Request, res: Response) {
    try {
      const genres = await getMovieGenres();

      return res.status(200).json(genres);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },

  async create(req: Request, res: Response) {},

  async update(req: Request, res: Response) {},

  async delete(req: Request, res: Response) {},
};
