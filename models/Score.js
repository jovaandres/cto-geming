const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema(
  {
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    score: {
      type: Number,
      default: 0
    },
    timeTaken: {
      type: Number,
      required: true
    }
  }
);

const Score = mongoose.model('Score', ScoreSchema);

module.exports = Score;
