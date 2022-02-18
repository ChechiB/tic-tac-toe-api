import { Router } from "express";
import { gameService } from '../services/game';
import { gameRepository } from '../repositories/game';
import { initGameController } from '../controllers/init_game';
import { playerService } from "../services/player";
import { playerRepository } from "../repositories/player";
import { createGameController, GameControllerDependencies } from "../controllers/new_game";

const router = Router();
// use type not interface
function setDependencies(): GameControllerDependencies {
/*     if (env.tes){
        //mock containers
        return {
            repositories: {
                keyRepo: repoMock
            },
            services: {
                keyService: serviceRepo
            }
        }
    }
    return{
        //implementacion posta
    } */
    return {
        services: {
            gameService,
            playerService
        },
        repositories: {
            gameRepository,
            playerRepository
        }
    }
}

const dependencies = setDependencies();
// New game
router.post(
    "/new",
    createGameController(dependencies)
);

// init game
router.post(
    "/init",
    initGameController(dependencies)
);

// Join to a game
router.post("/join/:hash");

// Get game status
router.get("/status/:hash");

export default router;
