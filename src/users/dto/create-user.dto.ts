import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Bobur', maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 25, minimum: 0, maximum: 150 })
  @IsInt()
  @Min(0)
  @Max(150)
  age: number;
}
