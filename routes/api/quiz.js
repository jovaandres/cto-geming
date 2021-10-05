const express = require('express');
const router = express.Router();
const service = require('../../services/quiz');
const grader = require('../../services/grader');
const middlewares = require('../../middlewares');

router.get('/', ...service.getQuiz);

router.get('/', middlewares.requireAuthUser, function(req, res) {
  return res.json({
    user: req.authUser.authSerialize(false),
  })
})

router.post('/grade', ...grader.grade);

module.exports = router;
