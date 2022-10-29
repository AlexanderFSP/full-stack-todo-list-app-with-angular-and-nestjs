import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { TokenPairDto } from './dto/token-pair.dto';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Create a new user account
   */
  @Post('signup')
  public async signup(@Body() createUserDto: CreateUserDto): Promise<TokenPairDto> {
    return this.authService.signup(createUserDto);
  }

  /**
   * Sign in an existing user
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public login(@Req() req: Request): Promise<TokenPairDto> {
    const user = req.user as User;

    return this.authService.createTokenPair(user);
  }

  /**
   * Refresh auth tokens
   */
  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  public refresh(@Req() req: Request): Promise<TokenPairDto> {
    const user = req.user as User;

    return this.authService.createTokenPair(user);
  }
}
