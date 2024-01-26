import { randomUUID } from 'crypto';

import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../../database/entities';

import { RefreshTokenDto, SignUpDto } from './dto';
import { HashingService } from '../hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { ActiveUserData } from '../../users/interfaces';
import { JwtTokensIdsStorage } from './jwt-tokens-ids-storage.service';

import jwtConfig from '../../env/configs/jwt.config';
import { ErrorCode } from '../../common/errors';
import { ISignInResponse } from './interfaces';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtTokensIdsStorage: JwtTokensIdsStorage,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const oldUser = await User.findOne({ where: { email: signUpDto.email } });
    if (oldUser) {
      throw new ConflictException(ErrorCode.USER.USER_EXISTS);
    }

    const user = User.build({
      email: signUpDto.email,
    });
    user.password = await this.hashingService.hash(signUpDto.password);
    await user.save();
  }

  async signIn(signInDto: SignUpDto): Promise<ISignInResponse> {
    const user = await User.unscoped().findOne({
      where: { email: signInDto.email },
    });
    if (!user) {
      throw new UnauthorizedException(ErrorCode.USER.NOT_EXISTS);
    }
    const isEqual = await this.hashingService.compare(
      signInDto.password,
      user.password,
    );
    if (!isEqual) {
      throw new UnauthorizedException(ErrorCode.USER.INVALID_PASSWORD);
    }
    return this.generateTokens(user);
  }

  async generateTokens(user: User): Promise<ISignInResponse> {
    const refreshTokenId = randomUUID();

    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        {
          email: user.email,
          role: user.role,
        },
      ),
      this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl, {
        refreshTokenId,
      }),
    ]);
    await this.jwtTokensIdsStorage.insert(user.id, refreshTokenId);
    return {
      accessToken,
      refreshToken,
    };
  }

  private signToken<T>(
    userId: number,
    expiresIn: number,
    payload?: T,
  ): Promise<string> {
    const jwtId = randomUUID();

    return this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
        jwtid: jwtId,
      },
    );
  }

  async refreshTokens(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<ISignInResponse> {
    const { sub, refreshTokenId } = await this.jwtService.verifyAsync<
      Pick<ActiveUserData, 'sub'> & { refreshTokenId: string }
    >(refreshTokenDto.refreshToken, {
      audience: this.jwtConfiguration.audience,
      issuer: this.jwtConfiguration.issuer,
      secret: this.jwtConfiguration.secret,
    });

    const user = await User.findOne({
      where: {
        id: sub,
      },
    });
    if (!user) {
      throw new UnauthorizedException(ErrorCode.USER.NOT_EXISTS);
    }
    const isValid = await this.jwtTokensIdsStorage.validate(
      user.id,
      refreshTokenId,
    );
    if (isValid) {
      await this.jwtTokensIdsStorage.invalidate(user.id);
    } else {
      throw new UnauthorizedException(ErrorCode.AUTH.INVALID_REFRESH_TOKEN);
    }
    return this.generateTokens(user);
  }

  async signOut(user: ActiveUserData): Promise<void> {
    const expirationTime = user.exp - user.iat;
    await this.jwtTokensIdsStorage.addToBlacklist(user.jti, expirationTime);
  }
}
