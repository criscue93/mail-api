<p align="center">
  <a href="https://github.com/criscue93" target="blank"><img src="src/img/logo.png" width="200" alt="KodeMain Logo" /></a>
</p>

<p align="center"></p><p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>

## Description

Mail - API, microservice for sending mail.

## Installation

```bash
$ npm install
```

## .ENV

In the .env.example file are the environment variables to be used to run the project.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Steps

### Obtener contraseña

Para poder utilizar el servicio, se tiene que ingresar a la cuenta del correo gmail, una vez ingresado a configuraciones de la cuenta ir al apartado de seguridad, ahi habilitar primer la autencicación de dos pasos.

Una vez activada esta opción, en el mismo apartado pero esta vez en contraseñas de aplicación, se tiene que crear una contraseña, ingresar, poner el nombre de la app y google automaticamente genera la contraseña, esta se tiene que guardar para poder ingresar a la base de datos.

### CRUD Correos

Se tiene el CRUD completo para el ingreso de diferentes correos de donde se harán el envío de los mismos, para cada uno se tiene que hacer el paso anterior.

### Listar todos los correos

```bash
EndPoint: GET - url/api/v1/mail/list
```

### Insertar un correo

```bash
EndPoint: POST - url/api/v1/mail/insert
{
  "correo": "correo de envio, con el que se siguio los anteriores pasos",
  "password": "contraseña generada para el correo, segun los anteriores pasos"
}
```

### Editar un correo

```bash
EndPoint: POST - url/api/mail/v1/update/:id
{
  "correo": "correo de envio, con el que se siguio los anteriores pasos",
  "password": "contraseña generada para el correo, segun los anteriores pasos"
}
```

### Editar el estado de un correo

```bash
EndPoint: POST - url/api/mail/v1/status/:id
```

### Envio de correos

```bash
EndPoint: POST - url/api/v1/send
{
  "correo": "Correo al que se enviará el mensaje, si son más de dos correos, tienen que estar separados por comas",
  "asunto": "Referencia del correo",
  "mensaje": "Cuerpo del correo, mensaje a enviar, en formato html",
  "archivo": [
    { "file": "nombre.tipo(pdf, docx, xlsx, etc)",
    "base64": "base64 del archivo a enviar" }, ...
  ],
  "funcionarioId": id del funcionario que envia el sms,
  "aplicacion": "codigo de la aplicación de la que se envia el mensaje"
  "guardar": truo or false,
}
```

## Stay in touch

- Author - Ing. Cristian Cueto V.
- Desarrollador - Ing. Cristian Cueto V.

## License

MAIL - API [MIT licensed](LICENSE).
