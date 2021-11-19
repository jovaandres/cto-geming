const Redis = require("ioredis");
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

redis.on("ready", () => {
  console.log("Redis connected");
});

module.exports = redis;