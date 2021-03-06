import SocketIO from "./socket";
import {Socket} from "socket.io";

const socks = SocketIO();
import Room from "../models/Room";
import Player from "../models/Players";
import Question from "../models/Question";

const iom = socks.getNamespace("multiplayer");

const createCode: any = async () => {
  let random = Math.ceil(Math.random() * 899999) + 100000;
  let exists = await Room.count({roomId: random});
  if (exists) {
    return await createCode();
  } else {
    return random.toString();
  }
}

iom.on("connection", async (socket: Socket) => {
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

  socket.on("rejoin", async (roomId, callback) => {
    let players = await Player.find({roomId: roomId}).sort({
      'score': 'desc',
      'timeTaken': 'asc'
    });

    socket.join(roomId);
    callback({
      players: players || []
    });
  });

  socket.on("join", async (data, callback) => {
    let filter = {roomId: data.gameCode}
    let room: any = await Room.findOne(filter)
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
      iom.to(roomId).emit("startGame", null);
    } else {
      callback({
        success: false,
        message: "Cannot start, no players joined!"
      });
    }
  });

  socket.on("play", async (roomId, callback) => {
    let room: any = await Room.findOne({roomId: roomId});
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
    let question: any = await Question.findOne({gistId: data.gistId});
    let roomId = data.roomId;
    let timeTaken = data.timeTaken.toFixed(2);
    if (question.language === data.answer) {
      let player: any = await Player.findOne({socketId: socket.id});
      await Player.findOneAndUpdate({socketId: socket.id},
        {score: question.score + player.score, timeTaken: timeTaken});
      let allPlayers = await Player.find({roomId: roomId}).sort({
        'score': 'desc',
        'timeTaken': 'asc'
      });
      iom.to(roomId).emit("players", allPlayers);
    }
  });

  socket.on("end", async (roomId) => {
    await Room.findOneAndUpdate({roomId: roomId}, {isEnd: true});
    iom.to(roomId).emit("endGame", null);
  })
})
