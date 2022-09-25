import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
  IsInt,
  IsString,
  MinLength,
} from 'class-validator';

export class mailDTO {
  @IsString({ message: 'Los correos de destino tienen que ser una cadena.' })
  @IsDefined({ message: 'Los correos de destino son obligatorios.' })
  @MinLength(1, {
    message: 'Los correos de destino debe contener al menos 1 caracter.',
  })
  @ApiProperty()
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
  @ApiProperty()
  mensaje: string;

  @ApiProperty({
    default: [],
    isArray: true,
    example:
      '[ { "file": "nombre.tipo(pdf, docx, xlsx, etc)", "base64": "base64 del archivo a enviar" } ...]',
  })
  archivo: any[];

  @IsInt({ message: 'El id del funcionario tiene que ser un número' })
  @ApiProperty()
  funcionarioId: number;

  @IsDefined({ message: 'El nombre de la aplicación es obligatorio' })
  @IsString({ message: 'El nombre de la aplicación debe ser una cadena' })
  @ApiProperty()
  aplicacion: string;

  @ApiProperty()
  @IsBoolean()
  guardar: boolean;
}
