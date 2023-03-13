import { DataSourceOptions } from 'typeorm';
import { Product } from './products/entities/product.entity';
import { User } from './users/entities/user.entity';

export const config: DataSourceOptions = {
  type: 'sqlite',
  database: '.db',
  synchronize: true,
  entities: [User, Product],
};

