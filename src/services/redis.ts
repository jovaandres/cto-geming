import IORedis from "ioredis";

const redis = new IORedis({
  port: Number(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST
});

redis.on("ready", () => {
  console.log("Redis connected");
});

export = redis;
