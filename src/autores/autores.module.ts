/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Autore } from './entities/autore.entity';
import { AutoresController } from './autores.controller';
import { AutoresService } from './autores.service';

@Module({
  imports: [TypeOrmModule.forFeature([Autore])],
  controllers: [AutoresController],
  providers: [AutoresService]
})
export class AutoresModule {}
