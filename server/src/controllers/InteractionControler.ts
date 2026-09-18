import { INTERACTION_TYPE } from "@prisma/client";
import { Request, Response } from "express";
import z from "zod";
import { prisma } from "../database";
import { getMovieById } from "../services/tmdb";
import { getCurrentUser } from "../utils/getUser";

export default {
  async newInteraction(req: Request, res: Response) {
    const createInteractionReqQuery = z.object({
      id: z.string(),
      type: z.nativeEnum(INTERACTION_TYPE),
    });

    try {
      const { id, type } = createInteractionReqQuery.parse(req.query);

      const user = await getCurrentUser(req);

      if (!user) {
        return res.status(404).json("Usuário não encontrado");
      }

      const movieExists = await prisma.movie.findUnique({
        where: {
          tmdbId: Number(id),
        },
      });

      if (!movieExists) {
        const movieTMDB = await getMovieById(Number(id));

        const generoPromises = movieTMDB.genres.map(
          (genre: { id: number; name: string }) =>
            prisma.genre.upsert({
              where: { tmdbId: genre.id },
              update: {}, // Se já existir, não faz nada
              create: {
                nome: genre.name,
                slug: genre.name, // Lembre-se de tratar o slug se necessário (ex: lowercase)
                tmdbId: genre.id,
              },
            }),
        );

        const generosCriados = await prisma.$transaction(generoPromises);

        await prisma.movie.create({
          data: {
            title: movieTMDB.title,
            tmdbId: movieTMDB.id,
            description: movieTMDB.overview,
            posterPath: movieTMDB.poster_path,
            releaseDate: new Date(movieTMDB.release_date),
            backdropPath: movieTMDB.backdrop_path,
            genres: {
              create: generosCriados.map((genre) => ({
                genreId: genre.id,
              })),
            },
          },
        });
      }

      const movieExistsConfirm = await prisma.movie.findUnique({
        where: {
          tmdbId: Number(id),
        },
      });

      if (!movieExistsConfirm) {
        return res.status(400).json();
      }

      const newInteraction = await prisma.userMovieInteraction.create({
        data: {
          type,
          movieId: movieExistsConfirm.id,
          userId: user.id,
        },
      });

      return res.status(200).json({ type, movieExistsConfirm });
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },

  async create(req: Request, res: Response) {},

  async update(req: Request, res: Response) {},

  async delete(req: Request, res: Response) {},
};
