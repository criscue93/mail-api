import { Module } from '@nestjs/common';
import { CorreoController } from './correos/correo.controller';
import { CorreoService } from './correos/correo.service';
import { CorreoQueryService } from './correos/correo-query.service';

@Module({
  imports: [],
  controllers: [CorreoController],
  providers: [CorreoService, CorreoQueryService],
})
export class ApiModule {}
