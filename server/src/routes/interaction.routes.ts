import { Router } from "express";
import InteractionControler from "../controllers/InteractionControler";
import { ensureAuthenticated } from "../middlewares/authentication";

export const interactionsRoutes = Router();

interactionsRoutes.post(
  "/interaction",
  ensureAuthenticated,
  InteractionControler.newInteraction,
);


interactionsRoutes.get(
  "/interaction/user",
  ensureAuthenticated,
  InteractionControler.viewInteractionUser,
);