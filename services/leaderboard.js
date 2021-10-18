const Score = require('../models/Score');

module.exports = {
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
