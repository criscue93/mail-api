import { Module } from '@nestjs/common';
import { CorreoController } from './correos/correo.controller';
import { CorreoService } from './correos/correo.service';
import { CorreoQueryService } from './correos/correo-query.service';
import { DatabaseModule } from '../conection/database.module';
import { mailProviders } from '../conection/mail.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CorreoController],
  providers: [...mailProviders, CorreoService, CorreoQueryService],
  exports: [CorreoQueryService],
})
export class ApiModule {}
