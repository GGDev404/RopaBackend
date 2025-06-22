import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsBoolean, IsArray } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsString()
  category: string;

  @ApiProperty({ required: false, default: true })
  @IsOptional()
  @IsBoolean()
  available?: boolean;

  @ApiProperty({ required: true, example: 10 })
  @IsNumber()
  stock: number;

  @ApiProperty({
    required: false,
    type: 'array',
    items: {
      type: 'object',
      properties: {
        color: { type: 'string' },
        sizes: { type: 'array', items: { type: 'string' } },
      },
    },
  })
  @IsOptional()
  @IsArray()
  variants?: Array<{ color: string; sizes: string[] }>;
}
