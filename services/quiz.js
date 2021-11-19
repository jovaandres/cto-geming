const Question = require('../models/Question');
const axios = require('axios');
const {randomLang, programmingLanguage} = require('../utils/randomLang');
const redis = require("./redis");

function splitDoc(docs, opt="", spl){
  const field = opt.split(' ');
  const fieldEx = field.splice(spl);
  let include = [];
  let exclude = [];
  docs.forEach(doc => {
    let resIn = { };
    let resEx = { };
    field.forEach(el => {
      resIn[el] = doc[el];
    });
    fieldEx.forEach(el => {
      resEx[el] = doc[el];
    })
    include.push(resIn);
    exclude.push(resEx);
  })
  return {
    include: include,
    exclude: exclude
  };
}

module.exports = {
  getQuiz: [
    function (req, res, next) {

      const questionLimit = req.query.limit || 15;
      let userId = req.query.id;

      Question.findRandom({}, {}, {limit: questionLimit}, function (err, results) {
        if (err) {
          return res.json({
            error: true,
            message: err.message
          });
        } else {
          if (results) {
            let data = splitDoc(results, "gistId filename score choice language score", 4);
            redis.set("quiz:"+userId, JSON.stringify(data.exclude), 'EX', 60 * 60 * 12);
            return res.json({
              error: false,
              data: data.include
            });
          } else {
            return res.json({
              error: true,
              data: null
            });
          }
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
            .then((response) => {
              return res.json({
                error: false,
                data: response
              });
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
