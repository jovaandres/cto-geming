import {Response, Router} from "express"

const userRouter = Router();
import service from "../../services/users"
import auth from "../../middlewares";

userRouter.post('/', ...service.create);

userRouter.get('/', auth.requireAuthUser, function (req: any, res: Response) {
  return res.json({
    user: req.authUser.authSerialize(false),
  })
})

userRouter.post('/login', ...service.login);

export = userRouter;
