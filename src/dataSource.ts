import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Card } from './models/Card';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'path/to/your/database.db',
  entities: [Card],
  synchronize: true,
  logging: false,
});
