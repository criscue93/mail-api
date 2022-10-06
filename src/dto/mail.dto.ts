import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsString, MinLength } from 'class-validator';

export class mailDTO {
  @IsString({ message: 'Los correos de destino tienen que ser una cadena.' })
  @IsDefined({ message: 'Los correos de destino son obligatorios.' })
  @MinLength(1, {
    message: 'Los correos de destino debe contener al menos 1 caracter.',
  })
  @ApiProperty()
  correo: string;

  @IsString({ message: 'El asunto tiene que ser una cadena.' })
  @IsDefined({ message: 'El asunto es obligatorio.' })
  @MinLength(1, {
    message: 'El asunto debe contener al menos 1 caracter.',
  })
  asunto: string;

  @IsString({ message: 'El mensaje tiene que ser una cadena.' })
  @IsDefined({ message: 'El mensaje es obligatorio.' })
  @MinLength(1, {
    message: 'El mensaje debe contener al menos 1 caracter.',
  })
  @ApiProperty()
  mensaje: string;

  @ApiProperty({
    default: [],
    isArray: true,
  })
  adjuntos: any[];

  @ApiProperty()
  @IsBoolean()
  guardar: boolean;
}
