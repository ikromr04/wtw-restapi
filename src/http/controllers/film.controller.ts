import { injectable } from 'inversify';
import { Request, Response } from 'express';
import BaseController from './base.controller.js';

@injectable()
export default class FilmController extends BaseController {
  constructor() {
    super();
  }

  public async index(_req: Request, res: Response): Promise<void> {
    this.ok(res, 'Not implemented yet');
  }

  public async create(_req: Request, res: Response): Promise<void> {
    this.ok(res, 'Not implemented yet');
  }

  public async read(_req: Request, res: Response): Promise<void> {
    this.ok(res, 'Not implemented yet');
  }

  public async update(_req: Request, res: Response): Promise<void> {
    this.ok(res, 'Not implemented yet');
  }

  public async delete(_req: Request, res: Response): Promise<void> {
    this.ok(res, 'Not implemented yet');
  }

  public async details(_req: Request, res: Response): Promise<void> {
    this.ok(res, 'Not implemented yet');
  }

  public async comments(_req: Request, res: Response): Promise<void> {
    this.ok(res, 'Not implemented yet');
  }
  public async leaveComment(_req: Request, res: Response): Promise<void> {
    this.ok(res, 'Not implemented yet');
  }

  public async promo(_req: Request, res: Response): Promise<void> {
    this.ok(res, 'Not implemented yet');
  }
}
