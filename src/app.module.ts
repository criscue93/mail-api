import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './apis/api.module';
import { DatabaseModule } from './conection/database.module';
import { ConfigModule } from '@nestjs/config';
import { Mail, MailSchema } from './schemas/mail.schema';
import { CorreoQueryService } from './apis/correos/correo-query.service';
import { mailProviders } from './conection/mail.providers';
@Module({
  imports: [
    ApiModule,
    DatabaseModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_MAIL, {
      connectionName: 'mail',
    }),
    MongooseModule.forFeature(
      [
        {
          name: Mail.name,
          schema: MailSchema,
        },
      ],
      'mail',
    ),
  ],
  controllers: [AppController],
  providers: [...mailProviders, AppService, CorreoQueryService],
})
export class AppModule {}
