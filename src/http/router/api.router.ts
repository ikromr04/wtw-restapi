import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.type.js';
import { LoggerInterface } from '../../logger/logger.interface.js';
import FilmController from '../controllers/film.controller.js';
import { HttpMethod } from '../../types/http-method.type.js';
import BaseRouter from './base.router.js';

@injectable()
export default class ApiRouter extends BaseRouter {
  constructor(
    @inject(Component.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(Component.FilmController) private filmController: FilmController,
  ) {
    super(logger);
    this.logger.info('API routes registration');

    this.addRoute(HttpMethod.Get, '/films', this.filmController.index.bind(filmController));
    this.addRoute(HttpMethod.Post, '/films', this.filmController.create.bind(filmController));
    this.addRoute(HttpMethod.Get, '/films/:filmId', this.filmController.read.bind(filmController));
    this.addRoute(HttpMethod.Put, '/films/:filmId', this.filmController.update.bind(filmController));
    this.addRoute(HttpMethod.Delete, '/films/:filmId', this.filmController.delete.bind(filmController));
    this.addRoute(HttpMethod.Get, '/films/:filmId/details', this.filmController.details.bind(filmController));
    this.addRoute(HttpMethod.Get, '/films/:filmId/comments', this.filmController.comments.bind(filmController));
    this.addRoute(HttpMethod.Post, '/films/:filmId/comments', this.filmController.leaveComment.bind(filmController));
    this.addRoute(HttpMethod.Get, '/films/promo', this.filmController.promo.bind(filmController));
  }
}
