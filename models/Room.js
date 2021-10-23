const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
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
  }
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
