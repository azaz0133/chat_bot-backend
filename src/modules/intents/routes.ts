import { Router } from "express";
import { CIntents } from "./controller";

export function rIntents(router: Router) {
  const controller = new CIntents();
  router.get("/", controller.getAll);
  router.get("/:displayName", controller.getByDisplayName);
  router.post("/", controller.createIntent);

  return router;
}
