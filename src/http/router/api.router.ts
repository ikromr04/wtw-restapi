import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.type.js';
import { LoggerInterface } from '../../logger/logger.interface.js';
import FilmController from '../controllers/film.controller.js';
import { HttpMethod } from '../../types/http-method.type.js';
import BaseRouter from './base.router.js';
import UserController from '../controllers/user.controller.js';
import GenreController from '../controllers/genre.controller.js';

@injectable()
export default class ApiRouter extends BaseRouter {
  constructor(
    @inject(Component.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(Component.FilmController) private filmController: FilmController,
    @inject(Component.UserController) private userController: UserController,
    @inject(Component.GenreController) private genreController: GenreController,
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

    this.addRoute(HttpMethod.Post, '/users/register', this.userController.register.bind(userController));
    this.addRoute(HttpMethod.Get, '/users/login', this.userController.check.bind(userController));
    this.addRoute(HttpMethod.Post, '/users/login', this.userController.login.bind(userController));
    this.addRoute(HttpMethod.Delete, '/users/logout', this.userController.logout.bind(userController));
    this.addRoute(HttpMethod.Get, '/users/favorite', this.userController.favorite.bind(userController));
    this.addRoute(HttpMethod.Post, '/users/favorite/:filmId', this.userController.toggleFavorite.bind(userController));

    this.addRoute(HttpMethod.Get, '/genres', this.genreController.index.bind(genreController));
    this.addRoute(HttpMethod.Get, '/genres/:genreId', this.genreController.read.bind(genreController));
  }
}
