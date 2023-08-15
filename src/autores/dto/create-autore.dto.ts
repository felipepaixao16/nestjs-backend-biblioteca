import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateAutoreDto {
  @IsString({ message: "O nome é obrigatório!"})
  @IsNotEmpty()
  nome: string;

  @IsString({ message: "Data de nascimento é obrigatório!"})
  @IsNotEmpty()
  dataDeNascimento: string;

  @IsString({ message: "Nacionalidade é obrigatório!"})
  @IsNotEmpty()
  nacionalidade: string;

  @IsInt({ message: "CPF é obrigatório!"})
  @IsNotEmpty()
  cpf: number;

  @IsInt()
  @Min(0)
  quantidadeLivro: number;
}
