import 'reflect-metadata';
import { Container } from 'inversify';
import { LoggerInterface } from './logger/logger.interface.js';
import { Component } from './types/component.js';
import LoggerService from './logger/logger.service.js';
import { ConfigInterface } from './config/config.interface.js';
import ConfigService from './config/config.service.js';

const appContainer = new Container();
appContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
appContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
