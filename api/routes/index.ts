import gameRouter from "./game";
import playerRouter from "./player";
import { Router } from "express";

export function loadRoutes(router: Router){
    router.use("/game", gameRouter); 
    router.use("/player", playerRouter);
}
