import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LivrosService } from './livros.service';
import { CreateLivroDto } from './dto/create-livro.dto';
import { LivrosStatus } from './enum/livros-status.enum';
import { Livro } from './entities/livro.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('livros')
export class LivrosController {
  constructor(private readonly livrosService: LivrosService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createLivroDto: CreateLivroDto) {
    return this.livrosService.create(createLivroDto);
  }

  @Get()
  findAll() {
    return this.livrosService.findAll();
  }

  @Get('lidos')
  @UseGuards(AuthGuard('jwt'))
  async getLivrosLidos(): Promise<Livro[]> {
  return this.livrosService.getLivrosLidos();
}

  @Get('salvos')
  @UseGuards(AuthGuard('jwt'))
  async getLivrosSalvos(): Promise<Livro[]> {
    return this.livrosService.getLivrosSalvos();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.livrosService.findOne(id);
  }

  @Patch(':id/status')
  @UseGuards(AuthGuard('jwt'))
  updateStatus(@Param('id') id: string, @Body('status') status: LivrosStatus) {
    return this.livrosService.updateStatus(id, status);
}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.livrosService.remove(id);
  }
}
