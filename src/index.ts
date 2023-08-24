import 'reflect-metadata';
import { Container } from 'inversify';
import { LoggerInterface } from './logger/logger.interface.js';
import { Component } from './types/component.js';
import LoggerService from './logger/logger.service.js';
import { ConfigInterface } from './config/config.interface.js';
import ConfigService from './config/config.service.js';
import Application from './app.js';
import { RouterInterface } from './http/router/router.interface.js';
import ApiRouter from './http/router/api.router.js';

const appContainer = new Container();
appContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
appContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
appContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
appContainer.bind<RouterInterface>(Component.ApiRouter).to(ApiRouter).inSingletonScope();

const application = appContainer.get<Application>(Component.Application);
application.init();
