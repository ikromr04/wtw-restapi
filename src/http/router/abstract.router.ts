import { Router } from 'express';
import { RouterInterface } from './router.interface.js';

export default abstract class AbstractRouter implements RouterInterface {
  private _router!: Router;

  constructor() {
    this._router = Router();
  }

  public get router() {
    return this._router;
  }
}
