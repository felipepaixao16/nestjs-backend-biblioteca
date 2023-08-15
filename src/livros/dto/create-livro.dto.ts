import { IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { LivrosStatus } from "../enum/livros-status.enum";

export class CreateLivroDto {

    @IsString({ message: "O título é obrigatório!"})
    @IsNotEmpty()
    titulo: string;
  
    @IsString({ message: "URL de uma imagem é obrigatório!"})
    @IsNotEmpty()
    img_url: string;
  
    @IsString({ message: "O gênero é obrigatório!"})
    @IsNotEmpty()
    genero: string;
  
    @IsString({ message: "O idioma é obrigatório!"})
    @IsNotEmpty()
    idioma: string;
  
    @IsInt({ message: "Ano de publicação é obrigatório!"})
    @IsNotEmpty()
    anoDePublicacao: number;

    @IsString({ message: "A sinopse é obrigatória!"})
    @IsNotEmpty()
    @MaxLength(188)
    sinopse: string;

    @IsString()
    status: string = LivrosStatus.CADASTRADO;

    @IsString({ message: "O nome do autor é obrigatório!"})
    autores: string;
}

