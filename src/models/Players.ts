import * as mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  socketId: {
    type: String,
    required: true
  },
  roomId: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    default: 0
  },
  timeTaken: {
    type: Number
  }
});

const Player = mongoose.model("Player", playerSchema);

export = Player;
