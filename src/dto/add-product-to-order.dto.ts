import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class AddProductToOrderDto {
  @ApiProperty()
  @IsNumber()
  orderId: number;

  @ApiProperty()
  @IsNumber()
  productId: number;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  price?: number;
}
