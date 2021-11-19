#!/usr/bin/env node

/**
 * Module dependencies.
 */
import app from "../app"
import debug from "debug";
import * as http from "http"
import MongoClient from "mongoose";
import {Server} from "socket.io";

debug("cto-app:server")
/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create https server.
 */
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN,
    credentials: true
  }
});
require("../services/redis");
import SocketIO from "../services/socket";
// @ts-ignore
const socks = new SocketIO(io);
require("../services/multiplayer");

/**
 * Listen on provided port, on all network interfaces.
 */
MongoClient.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err: any) => {
    console.log(err.message);
  })

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for https server "error" event.
 */

function onError(error: { syscall: string; code: any; }) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr?.port;
  debug('Listening on ' + bind);
  console.log(`Listening on port ${port}`);
}
