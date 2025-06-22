import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CartItemDto {
  @ApiProperty()
  productId: number;
  @ApiProperty()
  quantity: number;
}

export class UpdateCartDto {
  @ApiProperty({ type: [CartItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartItemDto)
  items: CartItemDto[];
}
