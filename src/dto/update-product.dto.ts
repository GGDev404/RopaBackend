import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  price?: number;

  @ApiProperty({ required: false })
  image?: string;

  @ApiProperty({ required: false })
  category?: string;

  @ApiProperty({ required: false })
  available?: boolean;

  @ApiProperty({ required: false })
  @IsNumber()
  stock?: number;
}
