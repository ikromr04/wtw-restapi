import { DocumentType } from '@typegoose/typegoose';
import CreateUserDTO from '../dto/user/create-user.dto.js';
import { UserClass } from '../models/user.model';
import LoginUserDto from '../dto/user/login-user.dto.js';

export interface UserServiceInterface {
  create(dto: CreateUserDTO): Promise<DocumentType<UserClass>>;
  verify(dto: LoginUserDto): Promise<DocumentType<UserClass> | null>;
  findByEmail(email: string): Promise<DocumentType<UserClass> | null>;
}
