const express = require('express');
const router = express.Router();
const service = require('../../services/leaderboard');

router.get('/', ...service.singleLeaderboard);

module.exports = router;
