import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { IResponse } from './interfaces/IResponse';

@Injectable()
export class AppService {
  getPing(): IResponse {
    return {
      error: false,
      message:
        'Bienvenido a MAIL - API, basado ​​en principios REST, devuelve metadatos JSON - Copyright © Ing. Cristian Cueto Vargas',
      response: {
        nameApp: 'MAIL - API',
        version: '0.0.1',
        dateTimeServer: DateTime.now().toISO(),
      },
      status: 200,
    };
  }
}
