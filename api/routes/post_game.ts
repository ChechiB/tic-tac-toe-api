import { Router } from "express";
import { gameService } from '../services/game';
import { gameRepository } from '../repositories/game';
import { createGameController, GameControllerDependencies } from '../controllers/init_game';

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
            gameService
        },
        repositories: {
            gameRepository
        }
    }
}

const dependencies = setDependencies();
// New game
router.post(
    "/new",
    createGameController(dependencies)
);

// Join to a game
router.post("/join/:hash");

// Get campaing status
router.get("/status/:hash");

