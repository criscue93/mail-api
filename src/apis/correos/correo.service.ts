import { Injectable } from '@nestjs/common';
import { IResponse } from 'src/interfaces/IResponse';
import { CorreoQueryService } from './correo-query.service';
import { correoDTO } from './correo.dto';

@Injectable()
export class CorreoService {
  constructor(private readonly correoQueryService: CorreoQueryService) {}

  async listMail(): Promise<IResponse> {
    let response = {
      error: true,
      message: 'Existen problemas con el servicio de listar todos los correos.',
      response: {},
      status: 500,
    };

    try {
      response = await this.correoQueryService.listMail();
    } catch (error) {
      response.error = true;
      response.message = 'No se pudo realizar la solicitud.';
      response.response = {
        errors: { mail: [`${error.message}`] },
      };
      response.status = 422;
    }

    return response;
  }

  async insertMail(data: correoDTO): Promise<IResponse> {
    let response = {
      error: true,
      message: 'Existen problemas con el servicio de insertar un correo.',
      response: {},
      status: 500,
    };

    try {
      const data1 = {
        where: 'mail.correo = :mail',
        value: {
          mail: data.correo,
        },
      };
      response = await this.correoQueryService.selectMail(data1);

      if (response.error) {
        response = await this.correoQueryService.insertMail(data);
      } else {
        response.error = true;
        response.message = 'El correo debe ser único.';
        response.response = {
          errors: { mail: ['El correo ya se encuentra registrado.'] },
        };
        response.status = 422;
      }
    } catch (error) {
      response.error = true;
      response.message = 'No se pudo realizar la solicitud.';
      response.response = {
        errors: { mail: [`${error.message}`] },
      };
      response.status = 422;
    }

    return response;
  }

  async updateMail(id: number, data: correoDTO): Promise<IResponse> {
    let response = {
      error: true,
      message: 'Existen problemas con el servicio de editar un correo.',
      response: {},
      status: 500,
    };

    try {
      response = await this.correoQueryService.updateMail(id, data);
    } catch (error) {
      response.error = true;
      response.message = 'No se pudo realizar la solicitud.';
      response.response = {
        errors: { mail: [`${error.message}`] },
      };
      response.status = 422;
    }

    return response;
  }

  async statusMail(id: number): Promise<IResponse> {
    let response = {
      error: true,
      message: 'Existen problemas con el servicio de editar un correo.',
      response: {},
      status: 500,
    };

    try {
      const data1 = {
        where: 'mail.id = :id',
        value: { id },
      };
      response = await this.correoQueryService.selectMail(data1);

      if (response.error === false) {
        const estado = response.response['mail_estado'];
        response = await this.correoQueryService.statusMail(id, estado);
      } else {
        response.error = true;
        response.message = 'El correo selecionado no existe.';
        response.response = {
          errors: { mail: ['El correo selecionado no existe.'] },
        };
        response.status = 422;
      }
    } catch (error) {
      response.error = true;
      response.message = 'No se pudo realizar la solicitud.';
      response.response = {
        errors: { mail: [`${error.message}`] },
      };
      response.status = 422;
    }

    return response;
  }
}
