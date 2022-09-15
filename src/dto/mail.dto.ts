import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, IsString, MinLength } from 'class-validator';

export class mail {
  @ApiProperty()
  correo: string;

  @ApiProperty()
  asunto: string;

  @ApiProperty()
  mensaje: string;

  @ApiProperty({
    default: [],
    isArray: true,
    example:
      '[ { "file": "nombre.tipo(pdf, docx, xlsx, etc)", "base64": "base64 del archivo a enviar" } ...]',
  })
  archivo: any[];

  @ApiProperty()
  funcionarioId: number;

  @ApiProperty()
  aplicacion: string;
}

export class mailDTO {
  @IsString({ message: 'Los correos de destino tienen que ser una cadena.' })
  @IsDefined({ message: 'Los correos de destino son obligatorios.' })
  @MinLength(1, {
    message: 'Los correos de destino debe contener al menos 1 caracter.',
  })
  correo: string;

  @IsString({ message: 'Subject tiene que ser una cadena.' })
  @IsDefined({ message: 'Subject es obligatorio.' })
  @MinLength(1, {
    message: 'Subject debe contener al menos 1 caracter.',
  })
  asunto: string;

  @IsString({ message: 'Subject tiene que ser una cadena.' })
  @IsDefined({ message: 'Subject es obligatorio.' })
  @MinLength(1, {
    message: 'Subject debe contener al menos 1 caracter.',
  })
  mensaje: string;

  archivo: any[];

  @IsInt({ message: 'El id del funcionario tiene que ser un número' })
  funcionarioId: number;

  @IsDefined({ message: 'El nombre de la aplicación es obligatorio' })
  @IsString({ message: 'El nombre de la aplicación debe ser una cadena' })
  aplicacion: string;
}
