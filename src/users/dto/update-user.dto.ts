import { IsNotEmpty } from 'class-validator';

export class updateUserDto {
  @IsNotEmpty()
  public login: string;

  @IsNotEmpty()
  public password: string;
}
