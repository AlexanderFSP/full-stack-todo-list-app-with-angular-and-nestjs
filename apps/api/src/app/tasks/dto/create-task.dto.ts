import { Transform, TransformFnParams } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => typeof value === 'string' && value.trim())
  content: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
