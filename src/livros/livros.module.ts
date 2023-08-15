import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Livro } from './entities/livro.entity';
import { LivrosController } from './livros.controller';
import { LivrosService } from './livros.service';
import { Autore } from 'src/autores/entities/autore.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Livro]),
  TypeOrmModule.forFeature([Autore])],
  controllers: [LivrosController],
  providers: [LivrosService]
})
export class LivrosModule {}
