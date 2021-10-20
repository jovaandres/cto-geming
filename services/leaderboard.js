const Score = require('../models/Score');

module.exports = {
  rank: [
    function (req, res, next) {
      let player = req.body.user;
      let highScore = 0;
      Score.find({player: player}).sort({'score': 'desc', 'timeTaken': 'asc'})
        .exec()
        .then(score => {
          if (score.length) {
            highScore = score[0].score;
            Score.count({
              "$and": [
                { score : { "$gte" : score[0].score } },
                { timeTaken : { "$lte" : score[0].timeTaken } },
                { player: { "$ne" : player } },
              ]
            })
              .exec()
              .then(result => {
                return res.json({
                  rank: result + 1,
                  highScore: highScore
                });
              });
          } else {
            return res.json({
              rank: -1,
              highScore: -1
            });
          }
        });
    }
  ],
  singleLeaderboard: [
    function (req, res, next) {
      Score.find({}, {}).sort({'score': 'desc', 'timeTaken': 'asc'}).populate({
        path: 'player',
        select: 'firstName lastName'
      })
        .exec()
        .then(board => {
          return res.json({
            error: false,
            data: board
          });
        }).catch(err => {
        return res.json({
          error: true,
          message: err.message
        });
      });
    }
  ]
}
