import { Router } from "express";
//Aca deberian estar todas las rutas
// cada ruta tiene un solo controller
// Ej: getgame tienen un controller, postGame tiene otro y asi
//received Router: rourter
export function loadRoutes(router: Router){
    router.use("/game/new");
    router.use("/game/join/:hash");
    router.use("/game/status/hash")
    router.use("/player/:id"); // Sin implementacion
}
