import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => typeof value === 'string' && value.trim())
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
