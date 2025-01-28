import { DataSource } from 'typeorm';

export const db = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: ['src/resources/**/*.entity.ts'],
});

export async function initializeDb() {
  try {
    // Initialize the data source
    console.log('Initializing the database...');
    await db.initialize();
    console.log('Database connection established');

    // Your application logic here
    // You can now interact with the DB using AppDataSource.getRepository(User), etc.
  } catch (error) {
    console.error('Error during data source initialization:', error);
  }
}
