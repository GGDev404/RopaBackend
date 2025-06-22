import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsEmail, IsString, IsEnum } from 'class-validator';
import { Product } from './product.entity';
import { Order } from './order.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  @ApiProperty()
  email: string;

  @Column()
  @IsString()
  @ApiProperty({ writeOnly: true })
  password: string;

  @Column({ default: 'customer' })
  @IsEnum(['customer', 'admin'])
  @ApiProperty({ default: 'customer', enum: ['customer', 'admin'] })
  role: string;

  @OneToMany(() => Product, product => product.seller)
  @ApiProperty({ type: () => [Product] })
  products: Product[];

  @OneToMany(() => Order, order => order.user)
  @ApiProperty({ type: () => [Order] })
  orders: Order[];
}