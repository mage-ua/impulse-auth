import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RefreshTokenDto, SignInDto, SignUpDto } from './dto';

import { ActiveUser, Auth } from '../../common/decorators';
import { ActiveUserData } from '../../users/interfaces';
import { AuthType } from '../../common/enums';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ISignInResponse } from './interfaces';

@Auth(AuthType.None)
@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto): Promise<ISignInResponse> {
    return this.authService.signIn(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-tokens')
  refreshTokens(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<ISignInResponse> {
    return this.authService.refreshTokens(refreshTokenDto);
  }

  @Auth(AuthType.Bearer)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('sign-out')
  signOut(@ActiveUser() user: ActiveUserData): Promise<void> {
    return this.authService.signOut(user);
  }
}
