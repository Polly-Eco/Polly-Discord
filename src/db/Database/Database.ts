import { DataSource, DataSourceOptions } from 'typeorm';

export class Database extends DataSource{
  constructor(options: DataSourceOptions) {
    super(options);
  }

  public async tryConn () {
    try {
        await this.initialize();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }

  public async setupDatabase () {
    const CREATE_DATABASE = 'CREATE DATABASE "local-dev";';
    try {
      await this.query(CREATE_DATABASE);
    } catch {
      console.log('the database already exists');
    }
  }
}
