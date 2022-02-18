import gameRouter from "./game";
import playerRouter from "./player";
import { Router } from "express";
//Aca deberian estar todas las rutas
// cada ruta tiene un solo controller
// Ej: getgame tienen un controller, postGame tiene otro y asi
//received Router: rourter
export function loadRoutes(router: Router){
    router.use("/game", gameRouter); 
    router.use("/player", playerRouter); // Sin implementacion
}
