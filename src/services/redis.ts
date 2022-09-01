import IORedis from "ioredis";

const redis = new IORedis({
  port: Number(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD
});

redis.on("ready", () => {
  console.log("Redis connected");
});

export = redis;