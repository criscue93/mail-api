import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, MinLength } from 'class-validator';

export class correo {
  @ApiProperty()
  correo: string;
}

export class correoDTO {
  @IsEmail()
  @IsDefined({ message: 'El correo es obligatorio' })
  @MinLength(1, { message: 'El correo debe contener al menos 1 caracter' })
  correo: string;
}
