import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, IsString, MinLength } from 'class-validator';

export class mail {
  @ApiProperty()
  to: string;

  @ApiProperty()
  subject: string;

  @ApiProperty()
  text: string;

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
  to: string;

  @IsString({ message: 'Subject tiene que ser una cadena.' })
  @IsDefined({ message: 'Subject es obligatorio.' })
  @MinLength(1, {
    message: 'Subject debe contener al menos 1 caracter.',
  })
  subject: string;

  @IsString({ message: 'Subject tiene que ser una cadena.' })
  @IsDefined({ message: 'Subject es obligatorio.' })
  @MinLength(1, {
    message: 'Subject debe contener al menos 1 caracter.',
  })
  text: string;

  @IsDefined({ message: 'El id del funcionario es obligatorio' })
  @IsInt({ message: 'El id del funcionario tiene que ser un número' })
  @ApiProperty()
  funcionarioId: number;

  @IsDefined({ message: 'El nombre de la aplicación es obligatorio' })
  @IsString({ message: 'El nombre de la aplicación debe ser una cadena' })
  @ApiProperty()
  aplicacion: string;
}
