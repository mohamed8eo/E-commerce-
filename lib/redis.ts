// lib/redis.ts
import { createClient } from 'redis';

if (!process.env.REDIS_URL) {
  throw new Error('REDIS_URL is not set');
}

const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.on('error', (err: unknown) => console.error('Redis Client Error', err));

(async () => {
  if (!redis.isOpen) {
    await redis.connect();
  }
})();

export default redis;
