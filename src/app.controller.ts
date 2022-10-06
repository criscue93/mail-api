import { Body, Controller, Get, Post, Res, Version } from '@nestjs/common';
import { Response } from 'express';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { validate } from 'class-validator';
import { mailDTO } from './dto/mail.dto';

@ApiTags('SERVICES')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Permite verificar si el servicio está funcionando.',
  })
  @ApiResponse({ status: 200, description: 'Ok' })
  getPing(@Res() res: Response) {
    const response = this.appService.getPing();

    return res.status(response.status).json(response);
  }

  @Version('1')
  @Post('/send')
  @ApiOperation({
    summary: 'Servicio enviar mensajes por correo',
  })
  @ApiBody({
    schema: {
      properties: {
        correo: {
          type: 'string',
          example: 'asdfg@gmail.com',
        },
        asunto: {
          type: 'string',
          example: 'Correo de prueba',
        },
        mensaje: {
          type: 'string',
          example: 'HTML del mensaje',
        },
        archivo: {
          type: 'object',
          example: [
            {
              file: 'nombre.pdf (de acuerdo al tipo)',
              base64: 'Base64 del archivo',
            },
          ],
        },
        guardar: {
          type: 'boolean',
          example: true,
        },
      },
    },
  })
  async sendMessage(@Res() res: Response, @Body() body: mailDTO) {
    let response = {
      error: true,
      message: 'Existen problemas con el controlador sendMessage',
      response: {},
      status: 422,
    };

    const data = new mailDTO();
    data.correo = body.correo;
    data.asunto = body.asunto;
    data.mensaje = body.mensaje;
    data.adjuntos = body.adjuntos;
    data.guardar = body.guardar;

    const valid = await validate(data);
    if (valid.length > 0) {
      const errorArray = valid.map((o) => ({
        [o.property]: Object.values(o.constraints),
      }));

      response.error = true;
      response.message = 'Error de validación';
      response.response = errorArray;
      response.status = 406;
    } else {
      try {
        response = await this.appService.sendMessage(data);

        let estadoEnvio = false;
        if (response.error === false) {
          estadoEnvio = true;
        }

        let fichero = false;
        if (data.adjuntos.length != 0) {
          fichero = true;
        }

        if (data.guardar === true) {
          const logs = {
            origen: {
              correo: response.response,
            },
            destino: {
              correo: data.correo,
              asunto: data.asunto,
              mensaje: data.mensaje,
              fichero,
            },
            enviado: estadoEnvio,
          };

          await this.appService.saveLogs(logs);
        }

        response.error = false;
        response.message = 'Se logró enviar el correo correctamente';
        response.response = {};
        response.status = 200;
      } catch (error) {
        response.response = error;
        response.status = 500;
      }
    }

    return res.status(response.status).json(response);
  }
}
