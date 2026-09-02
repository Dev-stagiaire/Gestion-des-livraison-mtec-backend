import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { Permission } from '../permission/entities/permission.entity';
import { SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DATABASE || 'glivraison',
  entities: [
    User,
    Role,
    Permission,
  ], 
  seeds: [
    'src/database/seeds/*.seed.ts',
  ],
});

export const AppDataSource = new DataSource(options);