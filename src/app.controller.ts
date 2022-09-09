import { Body, Controller, Get, Ip, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { getIP } from './helpers/util.helper';
import * as uaParser from 'ua-parser-js';
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
  async sendMessage(
    @Res() res: Response,
    @Req() req: Request,
    @Ip() ip,
    @Body() body: mail,
  ) {
    let response = {
      error: true,
      message: 'Existen problemas con el controlador sendMessage',
      response: {},
      status: 422,
    };

    const data = new mailDTO();
    data.to = body.to;
    data.subject = body.subject;
    data.text = body.text;
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

        const headers = req.headers;
        const agent = new uaParser(`${headers['user-agent']}`);
        const userAgent = agent.getResult();
        const logs = {
          origenMail: {
            email: process.env.USER_MAIL,
            aplicacion: data.aplicacion,
            funcionarioId: data.funcionarioId,
          },
          destinoMail: {
            email: data.to,
            subject: data.subject,
            text: data.text,
          },
          origen: {
            ip: getIP(ip),
            userAgent,
          },
        };

        await this.appService.saveLogs(logs);
      } catch (error) {
        response.response = error;
        response.status = 500;
      }
    }

    return res.status(response.status).json(response);
  }
}
