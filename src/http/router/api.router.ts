import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.type.js';
import { LoggerInterface } from '../../logger/logger.interface.js';
import FilmController from '../controllers/film.controller.js';
import { HttpMethod } from '../../types/http-method.type.js';
import BaseRouter from './base.router.js';
import UserController from '../controllers/user.controller.js';
import GenreController from '../controllers/genre.controller.js';
import { ValidateDTOMiddleware } from '../middlewares/validate-dto.middleware.js';
import CreateUserDTO from '../dto/user/create-user.dto.js';

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

    this.addRoute('/films', HttpMethod.Get, this.filmController.index.bind(filmController));
    this.addRoute('/films', HttpMethod.Post, this.filmController.create.bind(filmController));
    this.addRoute('/films/:filmId', HttpMethod.Get, this.filmController.read.bind(filmController));
    this.addRoute('/films/:filmId', HttpMethod.Put, this.filmController.update.bind(filmController));
    this.addRoute('/films/:filmId', HttpMethod.Delete, this.filmController.delete.bind(filmController));
    this.addRoute('/films/:filmId/details', HttpMethod.Get, this.filmController.details.bind(filmController));
    this.addRoute('/films/:filmId/comments', HttpMethod.Get, this.filmController.comments.bind(filmController));
    this.addRoute('/films/:filmId/comments', HttpMethod.Post, this.filmController.leaveComment.bind(filmController));
    this.addRoute('/films/promo', HttpMethod.Get, this.filmController.promo.bind(filmController));

    this.addRoute('/users/register', HttpMethod.Post, this.userController.register.bind(userController), [ new ValidateDTOMiddleware(CreateUserDTO) ]);
    this.addRoute('/users/login', HttpMethod.Get, this.userController.check.bind(userController));
    this.addRoute('/users/login', HttpMethod.Post, this.userController.login.bind(userController));
    this.addRoute('/users/logout', HttpMethod.Delete, this.userController.logout.bind(userController));
    this.addRoute('/users/favorite', HttpMethod.Get, this.userController.favorite.bind(userController));
    this.addRoute('/users/favorite/:filmId', HttpMethod.Post, this.userController.toggleFavorite.bind(userController));

    this.addRoute('/genres', HttpMethod.Get, this.genreController.index.bind(genreController));
    this.addRoute('/genres/:genreId', HttpMethod.Get, this.genreController.read.bind(genreController));
  }
}
