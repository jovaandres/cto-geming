const Question = require('../models/Question');
const axios = require('axios');
const randomLang = require('../utils/randomLang');

module.exports = {
  getQuiz: [
    function (req, res, next) {

      const questionLimit = req.query.limit || 15;
      let field = {"gistUrl": 1, "filename": 1, "score": 1}

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

      axios.get("https://api.github.com/gists/public?per_page=200")
        .then(datas => {
          datas.data.forEach(data => {
            let newData = {
              gistUrl: data.html_url + ".js",
              filename: Object.keys(data.files)[0],
              language: Object.values(data.files)[0].language || randomLang[Math.floor(Math.random() * (12))],
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
