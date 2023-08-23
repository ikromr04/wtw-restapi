import convict from 'convict';
import { ipaddress } from 'convict-format-with-validator';

convict.addFormat(ipaddress);

export type ConfigSchema = {
  HOST: string;
  PORT: number;
  DB_NAME: string;
  DB_HOST: string;
  DB_PORT: string;
  DB_USER: string;
  DB_PASSWORD: string;
  SALT: string;
  JWT_SECRET: string;
  UPLOAD_DIRECTORY: string;
  STATIC_DIRECTORY: string;
}

export const configSchema = convict<ConfigSchema>({
  HOST: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    env: 'HOST',
    default: null,
  },
  PORT: {
    doc: 'The port to bind.',
    format: 'port',
    env: 'PORT',
    default: null,
  },
  DB_NAME: {
    doc: 'Database name.',
    format: String,
    env: 'DB_NAME',
    default: null,
  },
  DB_HOST: {
    doc: 'The IP address to connect to the database.',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: null,
  },
  DB_PORT: {
    doc: 'The port to connect to the database.',
    format: 'port',
    env: 'DB_PORT',
    default: null,
  },
  DB_USER: {
    doc: 'Username to connect to the database.',
    format: String,
    env: 'DB_USER',
    default: null,
  },
  DB_PASSWORD: {
    doc: 'Database connection password.',
    format: String,
    env: 'DB_PASSWORD',
    default: null,
  },
  SALT: {
    doc: 'Salt for password hashing.',
    format: String,
    env: 'SALT',
    default: null,
  },
  JWT_SECRET: {
    doc: 'Secret for sign JWT.',
    format: String,
    env: 'JWT_SECRET',
    default: null,
  },
  UPLOAD_DIRECTORY: {
    doc: 'Directory for upload files.',
    format: String,
    env: 'UPLOAD_DIRECTORY',
    default: null,
  },
  STATIC_DIRECTORY: {
    doc: 'Directory for static files',
    format: String,
    env: 'STATIC_DIRECTORY',
    default: null,
  },
});
