import { Injectable } from '@nestjs/common';
import { IResponse } from 'src/interfaces/IResponse';
import { CorreoQueryService } from './correo-query.service';

@Injectable()
export class CorreoService {
  constructor(private readonly correoQueryService: CorreoQueryService) {}

  async listCorreo(): Promise<IResponse> {
    let response = {
      error: true,
      message: 'Existen problemas con el servicio de listar todos los correos.',
      response: {},
      status: 500,
    };

    try {
      response = response;
    } catch (error) {
      response.error = true;
      response.message = 'No se pudo realizar la solicitud.';
      response.response = {
        errors: { persona: [`${error.message}`] },
      };
      response.status = 422;
    }

    return response;
  }
}
