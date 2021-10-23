const SocketIO = require("../services/socket");
const socks = new SocketIO();
const Room = require("../models/Room");
const Player = require("../models/Players");
const Question = require("../models/Question");

const iom = socks.getNamespace("multiplayer");

iom.on("connection", async (socket) => {
  console.log("Client connected", socket.id);

  socket.on("create", async (roomId) => {
    let room = new Room({
      roomId: roomId
    });
    await room.save();
    socket.join(roomId);
  });

  socket.on("join", async (data, callback) => {
    let filter = {roomId: data.gameCode}
    let room = await Room.findOne(filter)
    if (room && !room.isStart) {
      let newPlayer = new Player({
        name: data.userId,
        roomId: data.gameCode
      });
      await newPlayer.save();
      let allPlayer = await Player.find({roomId: data.gameCode});
      callback({
        success: true
      });
      socket.join(room.roomId);
      iom.to(room.roomId).emit("players", allPlayer);
    } else {
      callback({
        success: false,
        message: "Game not found"
      });
    }
  });

  socket.on("start", async (roomId) => {
    let field = {"gistId": 1, "filename": 1, "score": 1, "choice": 1};
    const count = Math.floor(Math.random() * 100);
    const newQuestion = await Question.findOne({}, field).skip(count);

    let room = await Room.findOne({roomId: roomId});
    let question = room.questions;
    question.push(newQuestion);

    await Room.findOneAndUpdate({roomId: roomId}, {questions: question});

    iom.to(roomId).emit("startGame", roomId);
  });

  socket.on("play", async (roomId, callback) => {
    let room = await Room.findOne({roomId: roomId});
    let questions = room.questions;
    if (questions) {
      callback({
        success: true,
        questions: questions[0]
      });
    } else {
      callback({
        success: false,
        message: "Internal Server Error"
      });
    }
  });

  socket.on("disconnect", async (reason) => {
    let room = await Room.findOne({roomId: socket.id});
    if (room) {
      await Room.deleteOne({roomId: room.roomId});
      iom.to(room.roomId).emit("gameDestroyed");
    } else {
      let deletedPlayer = await Player.findOne({name: socket.id});
      if (deletedPlayer) {
        let roomId = deletedPlayer.roomId;
        await Player.deleteOne({name: socket.id});
        let allPlayer = await Player.find({roomId: roomId});
        iom.to(roomId).emit("players", allPlayer);
      }
    }
    console.log("Client disconnect", socket.id, "reason", reason);
  });
})
