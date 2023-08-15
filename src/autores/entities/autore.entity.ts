/* eslint-disable prettier/prettier */
import { Livro } from "src/livros/entities/livro.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Autore extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name:'nome', type: 'text' })
  nome: string;

  @Column({ name: 'data_De_Nascimento', type: 'text' })
  dataDeNascimento: string;

  @Column({ name: 'nacionalidade', type: 'text' })
  nacionalidade: string;

  @Column({ name: 'cpf', type: 'numeric' })
  cpf: number;

  @Column({ name: 'quantidadeLivro', type: 'int' })
  quantidadeLivro: number;


  @OneToMany(() => Livro, (livro) => livro.autores)
    livros: Livro[]
}