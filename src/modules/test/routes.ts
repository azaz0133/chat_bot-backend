import { Router } from "express";
import { CTest } from "./controller";

export function rTest(router: Router) {
  const controller = new CTest();

  router.get("/:message", controller.getTestMessage);

  return router;
}
