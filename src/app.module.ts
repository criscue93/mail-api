import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './apis/api.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Correos } from './entitys/correo.entity';
@Module({
  imports: [
    ApiModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      name: 'mail',
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT, 10),
      username: process.env.MAIL_USER,
      password: process.env.MAIL_PASSWORD,
      database: process.env.MAIL_DATABASE,
      entities: [Correos],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
