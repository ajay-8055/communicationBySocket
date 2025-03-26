import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

class CacheService {
    async get(key: string) {
        const data = await redis.get(key);
        return data ? JSON.parse(data) : null;
    }

    async set(key: string, value: any, ttl?: number) {
        const stringValue = JSON.stringify(value);
        if (ttl) {
            await redis.setex(key, ttl, stringValue)
        } else {
            await redis.set(key, stringValue);
        }
    }

    async invalidate(key: string) {
        await redis.del(key)
    }

    async invalidatePattern(pattern: string) {
        const keys = await redis.keys(pattern);
        if (keys.length > 0) {
            await redis.del(...keys)
        }
    }
}

export default new CacheService();