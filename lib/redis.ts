// lib/redis.ts
import { createClient } from "redis";

declare global {
  var redis: ReturnType<typeof createClient> | undefined;
}

const redis = globalThis.redis ?? createClient({ url: process.env.REDIS_URL });
if (!globalThis.redis) {
  redis.connect();
  globalThis.redis = redis;
  }

export default redis;
