import { Container } from 'inversify';
import { LoggerInterface } from './logger/logger.interface.js';
import { Component } from './types/component.js';
import LoggerService from './logger/logger.service';

const appContainer = new Container();
appContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
