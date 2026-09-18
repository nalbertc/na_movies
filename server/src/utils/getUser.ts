import { Request } from "express";
import { z } from "zod";
import { prisma } from "../database";

export async function getCurrentUser(req: Request) {
  const getUserParams = z.object({
    userId: z.string(),
  });

  const { userId } = getUserParams.parse(req);

  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}
