import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { z } from "zod";
import { authConfig } from "../configs/authConfig";
import { prisma } from "../database";
import { comparePassword } from "../services/auth";

export default {
  async authenticateUser(req: Request, res: Response) {
    try {
      const userLoginRequestBody = z.object({
        email: z.string(),
        senha: z.string(),
      });

      const { email, senha } = userLoginRequestBody.parse(req.body);

      const userAlreadExists = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      // verificar se usuario existe
      if (!userAlreadExists) {
        return res.status(400).json("Email ou senha inválidos");
      }

      if (!userAlreadExists.senha) {
        return res.status(400).json("Email ou senha inválidos");
      }

      // verificar se a senha esta correta
      const verifyPassword = await comparePassword(
        senha,
        userAlreadExists.senha,
      );

      if (!verifyPassword) {
        return res.status(400).json("Email ou senha inválidos");
      }

      // gerar token do usuario
      const token = sign({}, authConfig.secret!, {
        subject: userAlreadExists.id,
        expiresIn: authConfig.expiresIn,
      });

      return res.status(201).json({
        user: {
          id: userAlreadExists.id,
          name: userAlreadExists.nome,
          email: userAlreadExists.email,
        },
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },
};
