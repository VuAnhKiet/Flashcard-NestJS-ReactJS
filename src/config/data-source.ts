import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',  
  host: 'localhost',
  port: 5432,  
  username: 'postgres',  
  password: 'kietkiet175',  
  database: 'test1', 
  entities: [__dirname + '/../entities/*.entity{.ts,.js}'],  
  migrations: [__dirname + '/../config/migrations/*.ts'],
  synchronize: false,  
  logging: true, 
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
