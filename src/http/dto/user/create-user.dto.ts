import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
 } from 'class-validator';

export default class CreateUserDTO {
  @IsString()
  @MinLength(1, { message: 'Name must be at least 1 character' })
  @MaxLength(15, { message: 'Name cannot be more than 15 characters' })
  public name!: string;

  @IsString({ message: 'email is required' })
  @IsEmail()
  public email!: string;

  public avatar?: string;

  @IsString({ message: 'password is required' })
  @MinLength(6, { message: 'Password must be at least 6 character' })
  @MaxLength(12, { message: 'Password cannot be more than 12 characters' })
  public password!: string;
}
