import { Length, IsEmail } from 'class-validator';

export class UserDTO {
  @Length(10, 20)
  name!: string;

  @IsEmail()
  email!: string;
}
