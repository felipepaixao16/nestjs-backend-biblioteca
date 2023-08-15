import { IsNotEmpty, IsEmail, Matches } from "class-validator";
import { MessagesHelper } from "src/app/auth/helpers/messages.helpers";
import { RegExHelper } from "src/app/auth/helpers/regex.helpers";

export class CreateUserDto {
  @IsNotEmpty()
  nomeCompleto: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
  password: string;
}
