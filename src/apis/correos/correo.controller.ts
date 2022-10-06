import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Res,
  Version,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CorreoService } from './correo.service';
import { Response } from 'express';
import { correo, correoDTO } from './correo.dto';
import { validate } from 'class-validator';

@ApiTags('EMAIL')
@Controller('api')
export class CorreoController {
  constructor(private readonly correoService: CorreoService) {}

  @Version('1')
  @Get('/mail/list')
  @ApiOperation({ summary: 'Servicio para listar todos los correos.' })
  async listMail(@Res() res: Response) {
    let response = {
      error: true,
      message: 'Existen problemas con el controlador listMail.',
      response: {},
      status: 422,
    };

    try {
      response = await this.correoService.listMail();
    } catch (error) {
      response.error = true;
      response.message = 'Error de validación.';
      response.response = {
        errors: { mail: ['No se pudo extraer la lista de correos.'] },
      };
      response.status = 422;
    }

    return res.status(response.status).json(response);
  }

  @Version('1')
  @Post('/mail/insert')
  @ApiOperation({ summary: 'Servicio para insertar un correo.' })
  @ApiBody({
    schema: {
      properties: {
        correo: {
          type: 'string',
          example: 'asdgasd@gmail.com',
        },
        password: {
          type: 'string',
          example: 'asdfads$54ast4$',
        },
      },
    },
  })
  async insertMail(@Res() res: Response, @Body() body: correo) {
    let response = {
      error: true,
      message: 'Existen problemas con el controlador insertMail.',
      response: {},
      status: 422,
    };

    const data = new correoDTO();
    data.correo = body.correo;
    data.password = body.password;

    const valida = await validate(data);
    if (valida.length > 0) {
      const errorArray = valida.map((o) => ({
        [o.property]: Object.values(o.constraints),
      }));
      let condi = 0;
      let errors = [];

      while (errorArray[condi] != undefined) {
        errors = Object.assign(errors, errorArray[condi]);
        condi++;
      }

      response.error = true;
      response.message = 'Error de validación.';
      response.response = { errors: { ...errors } };
      response.status = 422;
    } else {
      try {
        response = await this.correoService.insertMail(data);
      } catch (error) {
        response.error = true;
        response.message = 'Error de validación.';
        response.response = {
          errors: { mail: ['No se pudo extraer la lista de correos.'] },
        };
        response.status = 422;
      }
    }

    return res.status(response.status).json(response);
  }

  @Version('1')
  @Put('/mail/update/:id')
  @ApiOperation({ summary: 'Servicio para editar un correo.' })
  @ApiBody({
    schema: {
      properties: {
        correo: {
          type: 'string',
          example: 'asdgasd@gmail.com',
        },
        password: {
          type: 'string',
          example: 'asdfads$54ast4$',
        },
      },
    },
  })
  async updateMail(
    @Res() res: Response,
    @Body() body: correo,
    @Param('id') id: number,
  ) {
    let response = {
      error: true,
      message: 'Existen problemas con el controlador updateMail.',
      response: {},
      status: 422,
    };

    const data = new correoDTO();
    data.correo = body.correo;
    data.password = body.password;

    const valida = await validate(data);
    if (valida.length > 0) {
      const errorArray = valida.map((o) => ({
        [o.property]: Object.values(o.constraints),
      }));
      let condi = 0;
      let errors = [];

      while (errorArray[condi] != undefined) {
        errors = Object.assign(errors, errorArray[condi]);
        condi++;
      }

      response.error = true;
      response.message = 'Error de validación.';
      response.response = { errors: { ...errors } };
      response.status = 422;
    } else {
      try {
        response = await this.correoService.updateMail(id, data);
      } catch (error) {
        response.error = true;
        response.message = 'Error de validación.';
        response.response = {
          errors: { mail: ['No se pudo extraer la lista de correos.'] },
        };
        response.status = 422;
      }
    }

    return res.status(response.status).json(response);
  }

  @Version('1')
  @Patch('/mail/status/:id')
  @ApiOperation({ summary: 'Servicio para cambiar el estado de un correo.' })
  async statusMail(@Res() res: Response, @Param('id') id: number) {
    let response = {
      error: true,
      message: 'Existen problemas con el controlador statusMail.',
      response: {},
      status: 422,
    };
    try {
      response = await this.correoService.statusMail(id);
    } catch (error) {
      response.error = true;
      response.message = 'Error de validación.';
      response.response = {
        errors: { mail: ['No se pudo extraer la lista de correos.'] },
      };
      response.status = 422;
    }

    return res.status(response.status).json(response);
  }
}
