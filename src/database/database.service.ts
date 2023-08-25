import { inject, injectable } from 'inversify';
import { DatabaseInterface } from './database.interface.js';
import { Component } from '../types/component.type.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import mongoose from 'mongoose';

@injectable()
export default class DatabaseService implements DatabaseInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
  ) {}

  public async connect(uri: string): Promise<void> {
    this.logger.info('Trying to connect to the database.');
    await mongoose.connect(uri);
    this.logger.info('Database connection established.');
  }

  public async disconnect(): Promise<void> {
    await mongoose.disconnect();
    this.logger.info('Database connection closed.');
  }
}
