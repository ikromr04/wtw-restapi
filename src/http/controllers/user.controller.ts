import { Request, Response } from 'express';
import BaseController from './base.controller.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.type.js';
import { UserServiceInterface } from '../../database/interfaces/user-service.interface.js';
import HttpError from '../../errors/http.error.js';
import { StatusCodes } from 'http-status-codes';
import CreateUserDTO from '../dto/user/create-user.dto.js';

@injectable()
export default class UserController extends BaseController {
  constructor(
    @inject(Component.UserServiceInterface) private userService: UserServiceInterface,
  ) {
    super();
  }

  public async register(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDTO>,
    res: Response
  ): Promise<void> {
    const existedUser = await this.userService.findByEmail(body.email);

    if (existedUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» already exists.`,
        'UserController::register',
      );
    }

    const user = await this.userService.create(body);

    this.created(res, user);
  }

  public async check(_req: Request, res: Response): Promise<void> {
    this.ok(res, 'Not implemented')
  }

  public async login(_req: Request, res: Response): Promise<void> {
    this.ok(res, 'Not implemented')
  }

  public async logout(_req: Request, res: Response): Promise<void> {
    this.ok(res, 'Not implemented')
  }

  public async favorite(_req: Request, res: Response): Promise<void> {
    this.ok(res, 'Not implemented')
  }

  public async toggleFavorite(_req: Request, res: Response): Promise<void> {
    this.ok(res, 'Not implemented')
  }
}
