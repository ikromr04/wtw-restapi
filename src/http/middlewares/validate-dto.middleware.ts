import { MiddlewareInterface } from './middleware.interface.js';
import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import ValidationError from '../../errors/validation.error.js';
import { transformErrors } from '../../utils/common.js';

export class ValidateDTOMiddleware implements MiddlewareInterface {
  constructor(private dto: ClassConstructor<object>) {}

  async execute(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const dtoInstance = plainToInstance(this.dto, req.body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      throw new ValidationError(
        `Validation error: "${req.path}"`,
        transformErrors(errors)
      );
    }

    next();
  }
}
