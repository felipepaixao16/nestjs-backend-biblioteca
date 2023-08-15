import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './entities/users.entity';

@Injectable()
export class UsersService {
  findOne(email: any) {
    throw new Error('Method not implemented.');
  }
  
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async findAll() {
    return await this.usersRepository.find({
      select: ['id', 'nomeCompleto', 'email'],
    });
  }

  async findOneById(id: string) {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findOneByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  async store(data: CreateUserDto) {
    return await this.usersRepository.findOne({ where: { email: data.email} })
      .then((usuario) => {
        if (usuario) {
          throw new NotFoundException('Esse email já está cadastrado no sistema!');
        }
        const user = this.usersRepository.create(data);
        return this.usersRepository.save(user);
      }); 
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.findOneById(id);
    this.usersRepository.merge(user, data);
    return await this.usersRepository.save(user);
  }

  async destroy(id: string) {
    await this.findOneById(id);
    this.usersRepository.softDelete({ id });
  }
}
