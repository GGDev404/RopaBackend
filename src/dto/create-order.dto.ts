import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsArray, ValidateNested, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @ApiProperty()
  @IsNumber()
  productId: number;

  @ApiProperty()
  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @ApiProperty({ required: false, default: 'pending' })
  @IsOptional()
  @IsString()
  status?: string;
}
