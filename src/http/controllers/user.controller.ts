import { Request, Response } from 'express';
import BaseController from './base.controller.js';
import { injectable } from 'inversify';

@injectable()
export default class UserController extends BaseController {
  constructor() {
    super();
  }

  public async register(_req: Request, res: Response): Promise<void> {
    this.ok(res, 'Not implemented')
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
