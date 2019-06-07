import { Router } from 'express';
import { CSession } from './controller';



export function rSession(router: Router) {
    const controller = new CSession()
    router.get("/user",controller.getUser);
    router.post("/login",controller.login);

    return router;
}