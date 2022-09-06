import { DataSource } from 'typeorm';
import { Correos } from '../entitys/correo.entity';

export const mailProviders = [
  {
    provide: 'MAIL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Correos),
    inject: ['DATA_SOURCE'],
  },
];
