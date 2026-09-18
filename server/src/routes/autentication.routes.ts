import { Router } from "express";
import AuthController from "../controllers/AuthController";

export const autenticationRoutes = Router();

autenticationRoutes.post("/login", AuthController.authenticateUser);
