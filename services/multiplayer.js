const SocketIO = require("../services/socket");
const socks = new SocketIO();
const Room = require("../models/Room");
const Player = require("../models/Players");
const Question = require("../models/Question");

const iom = socks.getNamespace("multiplayer");

const createCode = async () => {
  let random = Math.ceil(Math.random() * 899999) + 100000;
  let exists = await Room.count({roomId: random});
  if (exists) {
    return await createCode();
  } else {
    return random.toString();
  }
}

iom.on("connection", async (socket) => {

  socket.on("create", async (host, callback) => {
    let roomId = await createCode();
    let room = new Room({
      host: host,
      roomId: roomId
    });
    await room.save();
    socket.join(roomId);
    callback({
      quizCode: roomId
    })
  });

  socket.on("leader", async (roomId, callback) => {
    let players = await Player.find({roomId: roomId}).sort({
      'score': 'desc',
      'timeTaken': 'asc'
    });

    callback({
      players: players || []
    });
  });

  socket.on("join", async (data, callback) => {
    let filter = {roomId: data.gameCode}
    let room = await Room.findOne(filter)
    if (room && !room.isStart) {
      let newPlayer = new Player({
        name: data.name,
        socketId: data.userId,
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

  socket.on("start", async (roomId, callback) => {
    let players = await Player.count({roomId: roomId});
    if (players) {
      let field = {"gistId": 1, "filename": 1, "score": 1, "choice": 1};
      const count = Math.floor(Math.random() * 96);
      const newQuestion = await Question.find({}, field).skip(count).limit(4);

      await Room.findOneAndUpdate({roomId: roomId}, {questions: newQuestion, isStart: true});

      callback({
        success: true
      });
      iom.to(roomId).emit("startGame", roomId);
    } else {
      callback({
        success: false,
        message: "Cannot start, no players joined!"
      });
    }
  });

  socket.on("play", async (roomId, callback) => {
    let room = await Room.findOne({roomId: roomId});
    let questions = room.questions;
    if (questions) {
      callback({
        success: true,
        questions: questions
      });
    } else {
      callback({
        success: false,
        message: "Internal Server Error"
      });
    }
  });

  socket.on("submit", async (data) => {
    let question = await Question.findOne({gistId: data.gistId});
    let roomId = data.roomId;
    let timeTaken = data.timeTaken.toFixed(2);
    if (question.language === data.answer) {
      let player = await Player.findOne({socketId: socket.id});
      await Player.findOneAndUpdate({socketId: socket.id},
        {score: question.score + player.score, timeTaken: timeTaken});
      let allPlayers = await Player.find({roomId: roomId}).sort({
        'score': 'desc',
        'timeTaken': 'asc'
      });
      iom.to(roomId).emit("players", allPlayers);
    }
  });

  socket.on("disconnect", async () => {
    let deletedPlayer = await Player.count({socketId: socket.id});
    if (deletedPlayer) {
      await Player.deleteOne({socketId: socket.id});
    }
  });
})
