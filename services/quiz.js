const Question = require('../models/Question');
const axios = require('axios');
const {randomLang, programmingLanguage} = require('../utils/randomLang');

module.exports = {
  getQuiz: [
    function (req, res, next) {

      const questionLimit = req.query.limit || 15;
      let field = {"gistId": 1, "filename": 1, "score": 1, "choice": 1}

      Question.findRandom({}, field, {limit: questionLimit}, function (err, results) {
        if (err) {
          return res.json({
            error: true,
            message: err.message
          });
        } else {
          return res.json({
            error: false,
            data: results
          });
        }
      });
    }
  ],
  postQuiz: [
    function (req, res, next) {
      Question.deleteMany({score: {$gte: 0}})
        .catch(err => console.log(err.message));
      let insertData = [];

      axios.get("https://api.github.com/gists/public?per_page=100")
        .then(datas => {
          datas.data.forEach(data => {
            let language = Object.values(data.files)[0].language || randomLang[Math.floor(Math.random() * (12))];
            let choice = [];

            for (let i = 0; i < 4; i++) {
              choice.push(programmingLanguage[Math.floor(Math.random() * (28))])
            }
            choice[Math.floor(Math.random() * (4))] = language;

            let newData = {
              gistId: data.id,
              filename: Object.keys(data.files)[0],
              language: language,
              choice: choice,
              score: Math.floor(Math.random() * (25 - 5 + 1)) + 5
            }
            insertData.push(newData);
          })
          Question.insertMany(insertData)
            .then(() => {
              return res.sendStatus(200);
            })
            .catch(err => {
              return res.json({
                error: true,
                message: err.message
              });
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
