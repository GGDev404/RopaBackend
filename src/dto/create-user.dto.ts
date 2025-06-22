import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ required: false, enum: ['customer', 'admin'], default: 'customer' })
  @IsOptional()
  @IsEnum(['customer', 'admin'])
  role?: string;
}
