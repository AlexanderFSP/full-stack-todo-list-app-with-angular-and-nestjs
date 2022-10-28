import { Body, Controller, Get, NotImplementedException, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { TokenPairDto } from './dto/token-pair.dto';
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
    return this.authService.login(req.user as User);
  }

  /**
   * TODO: Log out an existing user
   */
  @Get('logout')
  public logout(): void {
    throw new NotImplementedException();
  }

  /**
   * TODO: Refresh auth tokens
   */
  @Post('refresh')
  public refresh(): void {
    throw new NotImplementedException();
  }
}
