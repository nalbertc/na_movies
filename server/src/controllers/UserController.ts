import { Request, Response } from "express";
import { prisma } from "../database";

export default {
  async allUsers(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();

      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },

  async create(req: Request, res: Response) {},

  async update(req: Request, res: Response) {},

  async delete(req: Request, res: Response) {},
};
