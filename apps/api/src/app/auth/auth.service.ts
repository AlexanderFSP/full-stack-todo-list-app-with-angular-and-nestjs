import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { Nullable } from '../models/nullable.model';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { TokenPairDto } from './dto/token-pair.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService
  ) {}

  public async validateUser(email: string, password: string): Promise<Nullable<User>> {
    const user = await this.usersService.findOne({ email });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    return isPasswordValid ? user : null;
  }

  public async signup(createUserDto: CreateUserDto): Promise<TokenPairDto> {
    const { email, password } = createUserDto;
    let user = await this.usersService.findOne({ email });

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    user = await this.usersService.create({ ...createUserDto, password: hashedPassword });

    return this.createTokenPair(user);
  }

  public async createTokenPair(user: User): Promise<TokenPairDto> {
    const payload = { sub: user.id, email: user.email } as JwtPayloadDto;
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '15m'
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d'
      })
    ]);

    return { access_token, refresh_token };
  }
}
