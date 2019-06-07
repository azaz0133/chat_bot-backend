import { Router } from "express";
import { CIntents } from "./controller";

export function rIntents(router: Router) {
  const controller = new CIntents();
  router.get("/", controller.getAll);
  return router;
}
