/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAutoreDto } from './dto/create-autore.dto';
import { UpdateAutoreDto } from './dto/update-autore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Autore } from './entities/autore.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AutoresService {

  constructor(
    @InjectRepository(Autore) private readonly repository: Repository<Autore>,
  ) {}

  create(createAutoreDto: CreateAutoreDto): Promise<Autore> {
    return this.repository.findOne({ where: { nome: createAutoreDto.nome, cpf: createAutoreDto.cpf } })
      .then((autor) => {
        if (autor) {
          throw new NotFoundException('O Autor já está cadastrado no sistema!');
        }
        const autore = this.repository.create(createAutoreDto);
        return this.repository.save(autore);
      });
  }
  

  findAll(): Promise<Autore[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Autore> {
    return this.repository.findOneBy({id: id});
  }

  async update(id: string, updateAutoreDto: UpdateAutoreDto): Promise<Autore> {
    const autor = await this.repository.preload({
      id: id,
      ...updateAutoreDto,
    });
    if (!autor) {
      throw new NotFoundException(`Autore ${id} not found`);
    }
    return this.repository.save(autor);
  }

  async remove(id: string) {
    const autor = await this.findOne(id);
    return this.repository.remove(autor);;
  }
}
