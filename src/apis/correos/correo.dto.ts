import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString, MinLength } from 'class-validator';

export class correo {
  @ApiProperty()
  correo: string;

  @ApiProperty()
  password: string;
}

export class correoDTO {
  @IsEmail()
  @IsDefined({ message: 'El correo es obligatorio.' })
  @MinLength(1, { message: 'El correo debe contener al menos 1 caracter.' })
  correo: string;

  @IsString({ message: 'La contraseña tiene que ser una cadena.' })
  @IsDefined({ message: 'La contraseña es obligatorio.' })
  @MinLength(1, { message: 'La contraseña debe contener al menos 1 caracter.' })
  password: string;
}
