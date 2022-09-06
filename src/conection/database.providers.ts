import { DataSource } from 'typeorm';
import { Correos } from '../entitys/correo.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT, 10),
        username: process.env.MAIL_USER,
        password: process.env.MAIL_PASSWORD,
        database: process.env.MAIL_DATABASE,
        entities: [Correos],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
