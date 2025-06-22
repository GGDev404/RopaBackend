import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column('text')
  @ApiProperty()
  description: string;

  @Column('decimal')
  @ApiProperty()
  price: number;

  @Column()
  @ApiProperty()
  image: string;

  @Column()
  @ApiProperty()
  category: string;

  @Column({ default: true })
  @ApiProperty({ default: true })
  available: boolean;

  @Column('int', { default: 0 })
  @ApiProperty({ example: 10 })
  stock: number;

  @ManyToOne(() => User, user => user.products)
  @ApiProperty({ type: () => User })
  seller: User;

  @Column('jsonb', { nullable: true })
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        color: { type: 'string', example: 'rojo' },
        sizes: {
          type: 'array',
          items: { type: 'string', example: 'M' }
        }
      }
    },
    example: [
      { color: 'rojo', sizes: ['S', 'M', 'L'] },
      { color: 'azul', sizes: ['M', 'L'] }
    ]
  })
  variants?: Array<{ color: string; sizes: string[] }>;
}
