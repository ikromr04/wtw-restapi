import 'reflect-metadata';
import { Container } from 'inversify';
import { LoggerInterface } from './logger/logger.interface.js';
import { Component } from './types/component.type.js';
import LoggerService from './logger/logger.service.js';
import { ConfigInterface } from './config/config.interface.js';
import ConfigService from './config/config.service.js';
import Application from './app.js';
import { RouterInterface } from './http/router/router.interface.js';
import ApiRouter from './http/router/api.router.js';
import FilmController from './http/controllers/film.controller.js';
import { ControllerInterface } from './http/controllers/controller.interface.js';
import { ExceptionInterface } from './http/exception/exception.interface.js';
import Exception from './http/exception/exception.js';
import UserController from './http/controllers/user.controller.js';
import GenreController from './http/controllers/genre.controller.js';

const appContainer = new Container();
appContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
appContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
appContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
appContainer.bind<RouterInterface>(Component.ApiRouter).to(ApiRouter).inSingletonScope();
appContainer.bind<ExceptionInterface>(Component.ExceptionInterface).to(Exception).inSingletonScope();

appContainer.bind<ControllerInterface>(Component.FilmController).to(FilmController).inSingletonScope();
appContainer.bind<ControllerInterface>(Component.UserController).to(UserController).inSingletonScope();
appContainer.bind<ControllerInterface>(Component.GenreController).to(GenreController).inSingletonScope();

const application = appContainer.get<Application>(Component.Application);
application.init();
