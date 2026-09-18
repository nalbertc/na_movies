import { NextFunction, Request, Response } from "express";
import { JwtPayload, decode, verify } from "jsonwebtoken";
import { authConfig } from "../configs/authConfig";

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json("Token is missing");
  }

  const [, token] = authToken.split(" ");

  try {
    verify(token, authConfig.secret!);

    const decodedToken = decode(token);

    if (typeof decodedToken === "string") {
      return res.status(401).json("Invalid token");
    }
    const sub = (decodedToken as JwtPayload)?.sub;

    req.userId = sub!;

    return next();
  } catch (error) {
    return res.status(401).json("Invalid token");
  }
}
