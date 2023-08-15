import { Autore } from "src/autores/entities/autore.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LivrosStatus } from "../enum/livros-status.enum";

@Entity({name: 'livros'})
export class Livro {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({type: 'varchar', length: 50 })
    titulo: string;

    @Column()
    img_url: string;

    @Column()
    genero: string;

    @Column()
    idioma: string;

    @Column({ name: "ano_De_Publicacao"})
    anoDePublicacao: number;

    @Column()
    sinopse: string;
    
    @Column({ default: LivrosStatus.CADASTRADO })
    status: string;

    @ManyToOne(() => Autore, (autores) => autores.livros)
    autores: Autore
}
