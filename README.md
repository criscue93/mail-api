<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Mail - API, microservicio para el envío de correos.

## Installation

```bash
$ npm install
```

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
EndPoint: GET - url/api/mail/list
```

### Insertar un correo

```bash
EndPoint: POST - url/api/mail/insert
{
  "correo": "correo de envio, con el que se siguio los anteriores pasos",
  "password": "contraseña generada para el correo, segun los anteriores pasos"
}
```

### Editar un correo

```bash
EndPoint: POST - url/api/mail/update/:id
{
  "correo": "correo de envio, con el que se siguio los anteriores pasos",
  "password": "contraseña generada para el correo, segun los anteriores pasos"
}
```

### Editar el estado de un correo

```bash
EndPoint: POST - url/api/mail/status/:id
```

### Envio de correos

```bash
EndPoint: POST - url/api/send
{
  "to": "Correo al que se enviará el mensaje, si son más de dos correos, tienen que estar separados por comas",
  "subject": "Referencia del correo",
  "text": "Cuerpo del correo, mensaje a enviar",
  "funcionarioId": id del funcionario que envia el sms,
  "aplicacion": "codigo de la aplicación de la que se envia el mensaje"

}
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - Ing. Cristian Cueto V.
- Desarrollador - Ing. Cristian Cueto V.

## License

MAIL - API [MIT licensed](LICENSE).
