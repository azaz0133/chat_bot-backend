import { Router } from "express";
import { CEntity } from "./controller";

export function rEntity(router: Router) {
  const controller = new CEntity();
  router.get("/", controller.getAll);
  router.post("/", controller.create);
  return router;
}
