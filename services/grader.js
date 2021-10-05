const Score = require('../models/Score');
const Question = require('../models/Question');

module.exports = {
  grade: [
    function (req, res, next) {
      const answers = req.body.data;
      const userId = req.body.user;
      const timeTakenInSec = req.body.timeTaken
      let point = 0;

      answers.forEach((answer) => {
        Question.findOne({gistUrl: answer.gistUrl, filename: answer.filename})
          .exec()
          .then(value => {
            if (value.language === answer.language) {
              point += answer.score;
            }
          })
      });

      const newScore = new Score({
        player: userId,
        score: point,
        timeTaken: timeTakenInSec
      });

      newScore.save().then(value => {
        return res.json({
          error: false,
          data: value
        })
      }).catch(next);
    }
  ]
}
