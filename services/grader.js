const Score = require('../models/Score');
const Question = require('../models/Question');
const { randomLang } = require('../utils/randomLang');

module.exports = {
  grade: [
    async function (req, res, next) {
      const answers = req.body.data;
      const userId = req.body.userId;
      const timeTakenInSec = req.body.timeTaken
      let point = 0;

      for (const answer of answers) {
        await Question.findOne({gistId: answer.gistId, filename: answer.filename})
          .exec()
          .then(value => {
            if ((value.language === answer.language) && !randomLang.includes(answer.language)) {
              point += value.score;
            }
          }).catch(err => {
            return res.json({
              error: true,
              message: err.message
            });
          });
      }

      if (timeTakenInSec > 100) {
        point -= (timeTakenInSec - 100) / 10
      }

      const newScore = new Score({
        player: userId,
        score: point,
        timeTaken: timeTakenInSec
      });

      let msg = (timeTakenInSec > 100) ? "Cupu gan" : "Gegegemink"

      newScore.save().then(value => {
        return res.json({
          score: value.score,
          message: msg
        })
      }).catch(err => {
        console.log(err.message);
      });
    }
  ]
}
