import { Inject, Injectable } from '@nestjs/common';
import { IResponse } from 'src/interfaces/IResponse';
import { Repository } from 'typeorm';
import { Correos } from '../../entitys/correo.entity';
import { correoDTO } from './correo.dto';
import * as cryptojs from 'crypto-js';

@Injectable()
export class CorreoQueryService {
  constructor(
    @Inject('MAIL_REPOSITORY')
    private mailRepository: Repository<Correos>,
  ) {}

  async listMail(): Promise<IResponse> {
    const response = {
      error: true,
      message: 'Existen problemas con el servicio de listar todos los correos.',
      response: {},
      status: 500,
    };

    try {
      const selectAllReturn = await this.mailRepository.find();

      if (selectAllReturn.length > 0) {
        response.error = false;
        response.message = 'Se logró obtener la lista de correos';
        response.response = selectAllReturn;
        response.status = 201;
      } else if (selectAllReturn.length === 0) {
        response.error = false;
        response.message = 'No hay registros de correos.';
        response.response = selectAllReturn;
        response.status = 201;
      } else {
        response.error = true;
        response.message = 'No se logró obtener la lista de correos.';
        response.response = {
          errors: { mail: ['No se logró obtener la lista de correos.'] },
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

  async insertMail(data: correoDTO): Promise<IResponse> {
    const response = {
      error: true,
      message: 'Existen problemas con el servicio de insertar un nuevo correo.',
      response: {},
      status: 500,
    };

    try {
      const encryptPassword = await cryptojs.AES.encrypt(
        JSON.stringify(data.password),
        process.env.KEY,
      ).toString();
      const insertReturn = await this.mailRepository
        .createQueryBuilder()
        .insert()
        .into(Correos)
        .values({ correo: data.correo, password: encryptPassword })
        .execute();

      if (insertReturn) {
        response.error = false;
        response.message = 'Se logró insertar el correo correctamente.';
        response.response = insertReturn.identifiers[0].id;
        response.status = 201;
      } else {
        response.error = true;
        response.message = 'No se logró insertar el correo.';
        response.response = {
          errors: { mail: ['No se logró insertar el correo.'] },
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
    const response = {
      error: true,
      message: 'Existen problemas con el servicio de editar un correo.',
      response: {},
      status: 500,
    };

    try {
      const encryptPassword = await cryptojs.AES.encrypt(
        JSON.stringify(data.password),
        process.env.KEY,
      ).toString();

      const updateReturn = await this.mailRepository
        .createQueryBuilder()
        .update(Correos)
        .set({ correo: data.correo, password: encryptPassword })
        .where('id = :id', { id })
        .execute();

      if (updateReturn) {
        response.error = false;
        response.message = 'Se logró editar el correo correctamente.';
        response.response = updateReturn.affected;
        response.status = 201;
      } else {
        response.error = true;
        response.message = 'No se logró editar el correo.';
        response.response = {
          errors: { mail: ['No se logró editar el correo.'] },
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

  async updateContador(id: number, contador: number): Promise<IResponse> {
    const response = {
      error: true,
      message: 'Existen problemas con el servicio de editar un correo.',
      response: {},
      status: 500,
    };

    try {
      const updateReturn = await this.mailRepository
        .createQueryBuilder()
        .update(Correos)
        .set({ contador: contador })
        .where('id = :id', { id })
        .execute();

      if (updateReturn) {
        response.error = false;
        response.message = 'Se logró editar el correo correctamente.';
        response.response = updateReturn.affected;
        response.status = 201;
      } else {
        response.error = true;
        response.message = 'No se logró editar el correo.';
        response.response = {
          errors: { mail: ['No se logró editar el correo.'] },
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

  async statusMail(id: number, estado: number): Promise<IResponse> {
    const response = {
      error: true,
      message:
        'Existen problemas con el servicio de cambiar el estado de un correo.',
      response: {},
      status: 500,
    };

    try {
      let dataStatus = 0;
      if (estado === 0) {
        dataStatus = 1;
      } else if (estado === 1) {
        dataStatus = 0;
      }

      const statusReturn = await this.mailRepository
        .createQueryBuilder()
        .update(Correos)
        .set({ estado: dataStatus })
        .where('id = :id', { id })
        .execute();

      if (statusReturn) {
        response.error = false;
        response.message =
          'Se logró cambiar el estado del correo correctamente.';
        response.response = statusReturn.affected;
        response.status = 201;
      } else {
        response.error = true;
        response.message = 'No se logró cambiar el estado del correo.';
        response.response = {
          errors: { mail: ['No se logró cambiar el estado del correo.'] },
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

  async selectMail(data: any): Promise<IResponse> {
    const response = {
      error: true,
      message:
        'Existen problemas con el servicio de seleccionar los datos de un correo.',
      response: {},
      status: 500,
    };

    try {
      const selectReturn = await this.mailRepository
        .createQueryBuilder()
        .select('mail')
        .from(Correos, 'mail')
        .where(data.where, data.value)
        .execute();

      if (selectReturn.length > 0) {
        response.error = false;
        response.message = 'Se logró los datos del correo correctamente.';
        response.response = selectReturn[0];
        response.status = 201;
      } else {
        response.error = true;
        response.message = 'No se logró obtener los datos del correo.';
        response.response = {
          errors: { mail: ['No se logró obtener los datos del correo.'] },
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

  async selectMailMinContador(): Promise<IResponse> {
    const response = {
      error: true,
      message:
        'Existen problemas con el servicio de seleccionar los datos de un correo.',
      response: {},
      status: 500,
    };

    try {
      const selectReturn = await this.mailRepository
        .createQueryBuilder()
        .select(
          'mail.id, mail.correo, mail.password, MIN(mail.contador) contador',
        )
        .from(Correos, 'mail')
        .where(
          'mail.contador = (SELECT MIN(contador) FROM correos) AND mail.estado = 0',
        )
        .groupBy('mail.correo')
        .orderBy('mail.id', 'ASC')
        .execute();

      if (selectReturn) {
        response.error = false;
        response.message = 'Se logró los datos del correo correctamente.';
        response.response = selectReturn[0];
        response.status = 201;
      } else {
        response.error = true;
        response.message = 'No se logró obtener los datos del correo.';
        response.response = {
          errors: { mail: ['No se logró obtener los datos del correo.'] },
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
