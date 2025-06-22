import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { OrderItem } from './order-item.entity';


@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => User, user => user.orders)
  @ApiProperty({ type: () => User })
  user: User;

  @Column('decimal')
  @ApiProperty()
  total: number;

  @Column({ default: 'pending' })
  @ApiProperty({ default: 'pending' })
  status: string;

  @OneToMany(() => OrderItem, item => item.order, { cascade: true })
  @ApiProperty({ type: () => [OrderItem] })
  items: OrderItem[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  createdAt: Date;
}
