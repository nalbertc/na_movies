import { Router } from "express";
import InteractionControler from "../controllers/InteractionControler";
import { ensureAuthenticated } from "../middlewares/authentication";

export const interactionsRoutes = Router();

interactionsRoutes.get(
  "/interaction",
  ensureAuthenticated,
  InteractionControler.newInteraction,
);
