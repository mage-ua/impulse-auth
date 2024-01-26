import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { JwtStatus } from '../../common/enums';
import { ErrorCode } from '../../common/errors';

export class InvalidatedRefreshTokenError extends Error {}

@Injectable()
export class JwtTokensIdsStorage {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async insert(userId: number, tokenId: string): Promise<void> {
    await this.redis.set(this.getKey(userId), tokenId);
  }

  async validate(userId: number, tokenId: string): Promise<boolean> {
    const storedId = await this.redis.get(this.getKey(userId));
    if (storedId !== tokenId) {
      throw new InvalidatedRefreshTokenError(ErrorCode.ACCESS_DENIED);
    }
    return storedId === tokenId;
  }

  async invalidate(userId: number): Promise<void> {
    await this.redis.del(this.getKey(userId));
  }

  private getKey(userId: number): string {
    return `user-${userId}`;
  }

  async addToBlacklist(jwtId: string, expirationTime: number): Promise<void> {
    await this.redis.set(jwtId, JwtStatus.Blacklisted, 'EX', expirationTime);
  }

  async isBlacklisted(jwtId: string): Promise<boolean> {
    const result = await this.redis.get(jwtId);
    return result === JwtStatus.Blacklisted;
  }
}
