import { Controller, Get, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CorreoService } from './correo.service';
import { Response } from 'express';

@ApiTags('CORREOS')
@Controller('api')
export class CorreoController {
  constructor(private readonly correoService: CorreoService) {}

  @Get('/correo/list')
  @ApiOperation({ summary: 'Servicio para listar todos los correos.' })
  async listCorreos(@Res() res: Response) {
    let response = {
      error: true,
      message: 'Existen problemas con el controlador listCorreos',
      response: {},
      status: 422,
    };

    try {
      response = response;
    } catch (error) {
      response.error = true;
      response.message = 'Error de validación.';
      response.response = {
        errors: { correo: ['No se pudo extraer la lista de correos.'] },
      };
      response.status = 422;
    }

    return res.status(response.status).json(response);
  }
}
