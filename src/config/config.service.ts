import { inject, injectable } from 'inversify';
import { ConfigInterface } from './config.interface.js';
import { ConfigSchema, configSchema } from './config.schema.js';
import { Component } from '../types/component.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { config } from 'dotenv';

@injectable()
export default class ConfigService implements ConfigInterface {
  private readonly config: ConfigSchema;

  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
  ) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exist.');
    }

    configSchema.load({});
    configSchema.validate({ allowed: 'strict', output: this.logger.info });

    this.config = configSchema.getProperties();
    this.logger.info('.env file found and successfully parsed!');
  }

  public get<T extends keyof ConfigSchema>(key: T): ConfigSchema[T] {
    return this.config[key];
  }
}
