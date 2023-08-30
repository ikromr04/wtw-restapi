import { DocumentType, types } from '@typegoose/typegoose';
import CreateUserDTO from '../../http/dto/user/create-user.dto.js';
import { UserServiceInterface } from '../interfaces/user-service.interface.js';
import { UserClass } from '../models/user.model.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.type.js';
import { LoggerInterface } from '../../logger/logger.interface.js';
import LoginUserDto from '../../http/dto/user/login-user.dto.js';
import { ConfigInterface } from '../../config/config.interface.js';

@injectable()
export default class UserService implements UserServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.UserModel) private userModel: types.ModelType<UserClass>,
  ) {}

  public async create(dto: CreateUserDTO): Promise<DocumentType<UserClass>> {
    const user = new UserClass(dto);
    user.setPassword(dto.password, this.config.get('SALT'));

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async verify(dto: LoginUserDto): Promise<DocumentType<UserClass> | null> {
    const user = await this.findByEmail(dto.email);

    if (!user) {
      return null;
    }

    if (user.verifyPassword(dto.password)) {
      return user;
    }

    return null;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserClass> | null> {
    return await this.userModel.findOne({ email }).exec();
  }
}
