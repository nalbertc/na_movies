import { Request, Response } from "express";
import { getMovieGenres } from "../services/tmdb";
import { prisma } from "../database";
import { INTERACTION_TYPE } from "@prisma/client";

export default {
  async newInteraction(req: Request, res: Response) {
    const interaction: INTERACTION_TYPE = "CLICK";

    const moviection = {
      id: 5,
      description: "",
      title: "",
    };

    try {
      const movie = await prisma.movie.upsert({
        where: {
          tmdbId: moviection.id,
        },
        update: {},
        create: {
          tmdbId: moviection.id,
          description: moviection.description,

          title: moviection.title,
        },
      });

      const newInteraction = await prisma.userMovieInteraction.create({
        data: {
          type: interaction,
          movieId: movie.id,
          userId: "sdfsdf",
        },
      });

      return res.status(200).json();
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },

  async create(req: Request, res: Response) { },

  async update(req: Request, res: Response) { },

  async delete(req: Request, res: Response) { },
};
