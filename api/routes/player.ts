import { Router } from "express";
import { gameService } from '../services/game';
import { gameRepository } from '../repositories/game';
import { playerService } from "../services/player";
import { playerRepository } from "../repositories/player";
import { GameControllerDependencies } from "../controllers/new_game";
import { createPlayerController } from "../controllers/create_player";
import { setSymbolPlayerController } from "../controllers/put_symbol_players";
import { checkSymbolPlayerMiddleware } from "../middleware/check_symbol";
import { getPlayerController } from '../controllers/get_player';

const router = Router();

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

// update symbols
router.put(
    "/symbol",
    checkSymbolPlayerMiddleware(dependencies),
    setSymbolPlayerController(dependencies)
);
// New player
router.post(
    "/new",
    createPlayerController(dependencies)
);

router
.get(
    "/:id",
    getPlayerController(dependencies)
);

export default router;