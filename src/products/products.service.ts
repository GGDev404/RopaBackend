import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { User } from '../entities/user.entity';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.productsRepository.find();
  }

  findOne(id: number) {
    return this.productsRepository.findOne({ where: { id } });
  }

  async create(createProductDto: CreateProductDto, userId: number) {
    const seller = await this.usersRepository.findOne({ where: { id: userId } });
    if (!seller) throw new Error('Usuario vendedor no encontrado');
    const product = this.productsRepository.create({ ...createProductDto, seller });
    return this.productsRepository.save(product);
  }

  async update(id: number, updateProductDto: UpdateProductDto, userId: number) {
    const product = await this.productsRepository.findOne({ where: { id }, relations: ['seller'] });
    if (!product) throw new Error('Producto no encontrado');
    if (!product.seller || product.seller.id !== userId) throw new Error('No autorizado para editar este producto');
    Object.assign(product, updateProductDto);
    return this.productsRepository.save(product);
  }

  async remove(id: number, userId: number) {
    const product = await this.productsRepository.findOne({ where: { id }, relations: ['seller'] });
    if (!product) throw new Error('Producto no encontrado');
    if (!product.seller || product.seller.id !== userId) throw new Error('No autorizado para eliminar este producto');
    await this.productsRepository.remove(product);
    return { message: 'Producto eliminado' };
  }
}
