import { Router } from "express";
import UsuarioController from "../controllers/UserController";

export const userRoutes = Router();

userRoutes.get("/", UsuarioController.allUsers);
