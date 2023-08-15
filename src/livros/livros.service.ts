import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLivroDto } from './dto/create-livro.dto';
import { Livro } from './entities/livro.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Autore } from 'src/autores/entities/autore.entity';
import { LivrosStatus } from './enum/livros-status.enum';

@Injectable()
export class LivrosService {

  constructor(
    @InjectRepository(Livro) private readonly livroRepository: Repository<Livro>,
    @InjectRepository(Autore) private readonly autoreRepository: Repository<Autore>,
  ) {}

  async create(createLivroDto: CreateLivroDto): Promise<Livro> {
    const autor = await this.autoreRepository.findOne({ where: { nome: createLivroDto.autores } });
    if (!autor) {
      throw new NotFoundException('Autor não encontrado. Verifique se o autor foi previamente cadastrado.');
    }
    const livro = new Livro();
    livro.titulo = createLivroDto.titulo;
    livro.img_url = createLivroDto.img_url;
    livro.genero = createLivroDto.genero;
    livro.idioma = createLivroDto.idioma;
    livro.anoDePublicacao = createLivroDto.anoDePublicacao;
    livro.sinopse = createLivroDto.sinopse; 
    livro.autores = autor;
    return this.livroRepository.save(livro);
  }

  async findAll(): Promise<Livro[]> {
    return this.livroRepository
    .createQueryBuilder('livro')
    .leftJoinAndSelect('livro.autores', 'autor')
    .select(['livro', 'autor.nome'])
    .getMany();
  }

  async findOne(id: string): Promise<Livro> {
    return this.livroRepository
    .createQueryBuilder('livro')
    .leftJoinAndSelect('livro.autores', 'autor')
    .select(['livro', 'autor.nome'])
    .where('livro.id = :id', { id })
    .getOne();
  }

  async updateStatus(id: string, status: LivrosStatus): Promise<Livro> {
    const livro = await this.livroRepository.findOne({ where: { id } });
    if (!livro) {
      throw new NotFoundException('Livro não encontrado.');
    }
    livro.status = status;
    return this.livroRepository.save(livro);
  }

  async getLivrosLidos(): Promise<Livro[]> {
    return this.livroRepository.createQueryBuilder('livro')
      .leftJoinAndSelect('livro.autores', 'autor')
      .where('livro.status = :status', { status: LivrosStatus.LIDOS })
      .getMany();
  }

  async getLivrosSalvos(): Promise<Livro[]> {
    return this.livroRepository.createQueryBuilder('livro')
      .leftJoinAndSelect('livro.autores', 'autor')
      .where('livro.status = :status', { status: LivrosStatus.SALVOS })
      .getMany();
  }

  async remove(id: string) {
    const livro = await this.findOne(id);
    return this.livroRepository.remove(livro);
  }
}
