import { Request, Response } from 'express';
import BaseController from './base.controller.js';
import { injectable } from 'inversify';

@injectable()
export default class GenreController extends BaseController {
  constructor() {
    super();
  }

  public async index(_req: Request, res: Response): Promise<void> {
    this.ok(res, 'Not implemented');
  }

  public async read(_req: Request, res: Response): Promise<void> {
    this.ok(res, 'Not implemented');
  }
}
