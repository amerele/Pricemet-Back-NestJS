import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException, InternalServerErrorException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
  
 create(product: CreateProductDto) {
    const newProduct =  this.productRepository.create(product);
    this.productRepository.save(newProduct);

    return newProduct;
  }

  findAll() {
    return this.productRepository.find();
  }

  async findOne(id: any) {
    const product = await this.productRepository.findOne({where:id=id});
    if (product) {
      return product;
    }
  }

  async update(id: any, updateProductDto: UpdateProductDto) {
    await this.productRepository.update(id, updateProductDto);
    const updatedProduct = await this.productRepository.findOne({where: id=id});
    if (updatedProduct) {
      return updatedProduct;
    }
  }

  async remove(id:any) {
    const deletedProduct = this.productRepository.delete(id)
    if(!deletedProduct) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
  }
}
