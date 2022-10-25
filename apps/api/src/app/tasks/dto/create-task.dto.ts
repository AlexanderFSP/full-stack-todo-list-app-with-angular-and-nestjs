import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  content: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
