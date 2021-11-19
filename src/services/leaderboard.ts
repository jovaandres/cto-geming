import {Request, Response} from "express";
import Score from "../models/Score";

export = {
  rank: [
    async function (req: Request, res: Response) {
      let player = req.body.user;
      let highScore = 0;
      let timeTaken = Infinity;
      const scores: any = await Score.find({player: player}).sort({
        'score': 'desc',
        'timeTaken': 'asc'
      })
      if (scores && scores[0]) {
        highScore = scores[0].score;
        timeTaken = scores[0].timeTaken;
      }
      const higher = await Score.count({
        "$and": [
          {score: {"$gt": highScore}},
          {player: {"$ne": player}},
        ]
      });
      const higherEq = await Score.count({
        "$and": [
          {score: {"$eq": highScore}},
          {timeTaken: {"$lt": timeTaken}},
          {player: {"$ne": player}},
        ]
      });
      if (highScore != null && higher != null && higherEq != null) {
        return res.json({
          rank: higher + higherEq + 1,
          highScore: highScore
        });
      } else {
        return res.json({
          rank: -1,
          highScore: -1
        });
      }
    }
  ],
  singleLeaderboard: [
    function (req: Request, res: Response) {
      Score.find({}, {}).sort({'score': 'desc', 'timeTaken': 'asc'}).populate({
        path: 'player',
        select: 'firstName lastName'
      })
        .exec()
        .then((board: any) => {
          return res.json({
            error: false,
            data: board
          });
        }).catch((err: any) => {
        return res.json({
          error: true,
          message: err.message
        });
      });
    }
  ]
}
