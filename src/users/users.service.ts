import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException, InternalServerErrorException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  
 create(user: CreateUserDto) {
    const newUser =  this.userRepository.create(user);
    this.userRepository.save(newUser);

    return newUser;
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: any) {
    const user = await this.userRepository.findOne({where:id=id});
    if (user) {
      return user;
    }
  }

  async update(id: any, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOne({where: id=id});
    if (updatedUser) {
      return updatedUser;
    }
  }

  async remove(id:any) {
    const deletedUser = this.userRepository.delete(id)
    if(!deletedUser) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
  }
}
