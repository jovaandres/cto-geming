const express = require('express');
const router = express.Router();
const service = require('../../services/leaderboard');

router.get('/', ...service.singleLeaderboard);
router.post('/rank', ...service.rank);

module.exports = router;
