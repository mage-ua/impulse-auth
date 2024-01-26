import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { Request } from 'express';
import { REQUEST_USER_KEY } from '../../../common/constants';
import jwtConfig from '../../../env/configs/jwt.config';
import { ErrorCode } from '../../../common/errors';
import { JwtTokensIdsStorage } from '../jwt-tokens-ids-storage.service';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtTokensIdsStorage: JwtTokensIdsStorage,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException(ErrorCode.AUTH.INVALID_ACCESS_TOKEN);
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );
      await this.isBlacklisted(payload.jti);
      request[REQUEST_USER_KEY] = payload;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async isBlacklisted(jti: string): Promise<void> {
    const isBlacklisted = await this.jwtTokensIdsStorage.isBlacklisted(jti);
    if (isBlacklisted) {
      throw new UnauthorizedException(ErrorCode.ACCESS_DENIED); // Token is blacklisted
    }
  }
}
