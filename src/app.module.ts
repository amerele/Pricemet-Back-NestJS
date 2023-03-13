import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

import { config } from './ormconfig';
import { ProductsModule } from './products/products.module';


@Module({
  imports: [TypeOrmModule.forRoot(config), UsersModule, ProductsModule],
})
export class AppModule {}
