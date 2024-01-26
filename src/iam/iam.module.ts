import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard, AuthenticationGuard } from './authentication/guards';
import { JwtTokensIdsStorage } from './authentication/jwt-tokens-ids-storage.service';
import { RolesGuard } from './authorization/guards';
import jwtConfig from '../env/configs/jwt.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../database/entities';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AuthenticationService,
    AccessTokenGuard,
    JwtTokensIdsStorage,
  ],
  controllers: [AuthenticationController],
})
export class IamModule {}
