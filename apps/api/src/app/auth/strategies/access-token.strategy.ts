import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET
    });
  }

  public validate(payload: JwtPayloadDto): Promise<User> {
    return this.usersService.findOne({ id: payload.sub });
  }
}
