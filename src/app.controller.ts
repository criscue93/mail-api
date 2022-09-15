import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { validate } from 'class-validator';
import { mail, mailDTO } from './dto/mail.dto';

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

  @Post('/send')
  @ApiOperation({
    summary: 'Servicio enviar mensajes por Telegram',
  })
  async sendMessage(@Res() res: Response, @Body() body: mail) {
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
    data.archivo = body.archivo;
    data.funcionarioId = body.funcionarioId;
    data.aplicacion = body.aplicacion;

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

        let estadoFichero = false;
        if (data.archivo.length != 0) {
          estadoFichero = true;
        }

        const logs = {
          origen: {
            correo: response.response,
            app_nombre: data.aplicacion,
            funcionario: data.funcionarioId,
          },
          destino: {
            correo: data.correo,
            asunto: data.asunto,
            mensaje: data.mensaje,
            fichero: estadoFichero,
          },
          enviado: estadoEnvio,
        };

        await this.appService.saveLogs(logs);

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
