import { IsNotEmpty } from 'class-validator';

export class createUserDto {
  @IsNotEmpty()
  public login: string;

  @IsNotEmpty()
  public password: string;
}
