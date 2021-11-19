import * as mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  roomId: {
    type: String,
    required: true
  },
  questions: {
    type: Array,
    default: []
  },
  isStart: {
    type: Boolean,
    default: false
  },
  isEnd: {
    type: Boolean,
    default: false
  }
});

const Room = mongoose.model("Room", roomSchema);

export = Room;
