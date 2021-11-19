import {Router} from "express"

const leaderRouter = Router();
import service from "../../services/leaderboard";

leaderRouter.get('/', ...service.singleLeaderboard);
leaderRouter.post('/rank', ...service.rank);

export = leaderRouter;
