"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const redis = new ioredis_1.default(process.env.REDIS_URL || "redis://localhost:6379");
class CacheService {
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield redis.get(key);
            return data ? JSON.parse(data) : null;
        });
    }
    set(key, value, ttl) {
        return __awaiter(this, void 0, void 0, function* () {
            const stringValue = JSON.stringify(value);
            if (ttl) {
                yield redis.setex(key, ttl, stringValue);
            }
            else {
                yield redis.set(key, stringValue);
            }
        });
    }
    invalidate(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield redis.del(key);
        });
    }
    invalidatePattern(pattern) {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = yield redis.keys(pattern);
            if (keys.length > 0) {
                yield redis.del(...keys);
            }
        });
    }
}
exports.default = new CacheService();
