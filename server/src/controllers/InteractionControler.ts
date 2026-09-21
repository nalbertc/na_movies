
import { INTERACTION_TYPE, UserMovieInteraction } from "@prisma/client";
import { Request, Response } from "express";
import z from "zod";
import { prisma } from "../database";
import { getMovieById } from "../services/tmdb";
import { getCurrentUser } from "../utils/getUser";

const interactionFieldMap: Record<INTERACTION_TYPE, keyof UserMovieInteraction> = {
  [INTERACTION_TYPE.VIEW]: 'viewedAt',
  [INTERACTION_TYPE.LIKE]: 'likedAt',
  [INTERACTION_TYPE.SAVE]: 'savedAt',
  [INTERACTION_TYPE.SHARE]: 'shared', // Nome exato do seu schema
  [INTERACTION_TYPE.CLICK]: 'createdAt', // Ou outra coluna se tiver clicadoAt
  [INTERACTION_TYPE.DISLIKE]: 'createdAt', // Ajuste conforme seu schema se tiver algo específico
};

export default {
  async newInteraction(req: Request, res: Response) {
    const createInteractionReqQuery = z.object({
      id: z.string(),
      type: z.nativeEnum(INTERACTION_TYPE),
    });

    try {
      // 1. Validação dos dados de entrada
      const { id, type } = createInteractionReqQuery.parse(req.query);
      const tmdbIdNum = Number(id);

      const targetField = interactionFieldMap[type];
      const user = await getCurrentUser(req);

      if (!user) {
        return res.status(404).json("Usuário não encontrado");
      }

      // 2. Busca o filme e seus gêneros de uma só vez
      let movie = await prisma.movie.findUnique({
        where: { tmdbId: tmdbIdNum },
        include: { genres: true }
      });

      // 3. Se o filme não existir, busca no TMDB e cria no banco
      if (!movie) {
        const movieTMDB = await getMovieById(tmdbIdNum);

        movie = await prisma.movie.create({
          data: {
            title: movieTMDB.title,
            tmdbId: movieTMDB.id,
            description: movieTMDB.overview,
            posterPath: movieTMDB.poster_path,
            releaseDate: new Date(movieTMDB.release_date),
            backdropPath: movieTMDB.backdrop_path,
            genres: {
              create: movieTMDB.genres.map((genre: { id: number; name: string }) => ({
                genre: {
                  connectOrCreate: {
                    where: { tmdbId: genre.id },
                    create: {
                      nome: genre.name,
                      slug: genre.name.toLowerCase().trim(), // Exemplo de tratamento de slug
                      tmdbId: genre.id
                    }
                  }
                }
              }))
            }
          },
          include: { genres: true } // Já retorna os gêneros acoplados
        });
      }

      if (!movie) {
        return res.status(400).json("Erro ao registrar ou encontrar o filme.");
      }

      // 4. Verifica duplicidade da interação
      const existingInteraction = await prisma.userMovieInteraction.findFirst({
        where: {
          userId: user.id,
          movieId: movie.id,
          [targetField]: { not: null }
        }
      });

      if (existingInteraction) {
        return res.status(200).json("Interação já existe");
      }

      // 5. Registra a nova interação
      const movieInteraction = await prisma.userMovieInteraction.create({
        data: {
          type,
          userId: user.id,
          movieId: movie.id,
          [targetField]: new Date()
        },
        include: { movie: true, user: true }
      });

      // 6. Atualização de pesos dos gêneros (Otimizado)
      const weightMap: Record<INTERACTION_TYPE, number> = {
        [INTERACTION_TYPE.VIEW]: 0.2,
        [INTERACTION_TYPE.SAVE]: 1.0,
        [INTERACTION_TYPE.SHARE]: 1.5,
        [INTERACTION_TYPE.LIKE]: 2.0,
        [INTERACTION_TYPE.CLICK]: 0,
        [INTERACTION_TYPE.DISLIKE]: 0 // Ajuste este valor se dislike diminuir peso (ex: -1)
      };

      const value = weightMap[type] || 0;

      // Só faz requisições ao banco se o peso for relevante (> 0 ou < 0)
      if (value !== 0) {
        const genreUpsertPromises = movie.genres.map((genre) =>
          prisma.userGenre.upsert({
            where: {
              userId_genreId: {
                userId: user.id,
                genreId: genre.genreId,
              }
            },
            update: {
              weight: { increment: value }
            },
            create: {
              weight: value,
              userId: user.id,
              genreId: genre.genreId
            }
          })
        );

        // Executa todos os upserts concorrentemente de forma segura antes da resposta
        await Promise.all(genreUpsertPromises);
      }

      return res.status(200).json({ type, movieInteraction });

    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Parâmetros inválidos", details: error.errors });
      }
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },

  async viewInteractionUser(req: Request, res: Response) {

    try {

      const user = await getCurrentUser(req);

      if (!user) {
        return res.status(404).json("Usuário não encontrado");
      }

      const interactionUser = await prisma.userGenre.findMany({
        where: {
          userId: user.id,

        }, include: {
          genre: true
        }
      });



      return res.status(200).json(interactionUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }

  },

  async update(req: Request, res: Response) { },

  async delete(req: Request, res: Response) { },
};
