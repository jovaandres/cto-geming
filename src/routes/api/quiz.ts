import {Response, Router} from "express";

const quizRouter = Router();

import service from "../../services/quiz";
import grader from "../../services/grader";
import auth from "../../middlewares";

quizRouter.get('/', ...service.getQuiz);
quizRouter.post('/', ...service.postQuiz);

quizRouter.get('/', auth.requireAuthUser, function (req: any, res: Response) {
  return res.json({
    user: req.authUser.authSerialize(false),
  })
})

quizRouter.post('/grade', ...grader.grade);

export = quizRouter;
