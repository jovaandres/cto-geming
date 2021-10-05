const Question = require('../models/Question');

module.exports = {
  getQuiz: [
    function (req, res, next) {

      const questionLimit = req.body.limit;
      let field = {"gistUrl": 1, "filename": 1, "language": 0, "score": 1 }

      Question.findRandom({}, field, {limit: questionLimit})
        .exec()
        .then(value => {
          return res.json({
            error: false,
            data: value
          });
        }).catch(reason => {
        return res.json({
          error: true,
          message: reason.message
        });
      });
    }
  ],
}
