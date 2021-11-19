const Score = require('../models/Score');
const Question = require('../models/Question');
const { randomLang } = require('../utils/randomLang');
const redis = require("./redis");

module.exports = {
  grade: [
    async function (req, res, next) {
      const answers = req.body.data;
      const userId = req.body.userId;
      const timeTakenInSec = req.body.timeTaken
      let point = 0;

      let cachedQ = await redis.get("quiz:"+userId);
      if (cachedQ) {
        cachedQ = JSON.parse(cachedQ);
        let i = 0;
        for (const answer of answers) {
          if (answer.language === cachedQ[i].language) {
            point += cachedQ[i].score;
          }
          i++;
        }
      } else {
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
      }

      if (timeTakenInSec > 100) {
        point -= (timeTakenInSec - 100) / 10
      }

      const newScore = new Score({
        player: userId,
        score: point.toFixed(2),
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
