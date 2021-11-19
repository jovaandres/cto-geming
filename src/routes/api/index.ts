import {NextFunction, Request, Response, Router} from "express"

const router = Router();

import userRouter from "./users";
import quizRouter from "./quiz";
import leaderRouter from "./leader";

router.use('/users', userRouter);
router.use('/quiz', quizRouter);
router.use('/leaderboard', leaderRouter);

router.use(function (err: any, req: Request, res: Response, next: NextFunction) {

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      success: false,
      message: "You must be logged in",
      ...err,
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(422).json(err);
  }

  if (err.name === "BadRequest") {
    return res.status(400).json(err)
  }
  next(err);
})

export = router;
