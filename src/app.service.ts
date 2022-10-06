import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DateTime } from 'luxon';
import { IResponse } from './interfaces/IResponse';
import { mailDTO } from './dto/mail.dto';
import * as nodemailer from 'nodemailer';
import { Mail, MailDocument } from './schemas/mail.schema';
import { Model } from 'mongoose';
import { CorreoQueryService } from './apis/correos/correo-query.service';
import * as cryptojs from 'crypto-js';

@Injectable()
export class AppService {
  constructor(
    private readonly correoQueryService: CorreoQueryService,
    @InjectModel(Mail.name, 'mail')
    private mailDocument: Model<MailDocument>,
  ) {}

  getPing(): IResponse {
    return {
      error: false,
      message:
        'Bienvenido a MAIL - API, basado ​​en principios REST, devuelve metadatos JSON - Copyright © Ing. Cristian Cueto Vargas',
      response: {
        nameApp: 'MAIL - API',
        version: '0.0.1',
        dateTimeServer: DateTime.now().toISO(),
      },
      status: 200,
    };
  }

  async sendMessage(data: mailDTO): Promise<IResponse> {
    let response: IResponse = {
      error: true,
      message: 'Existen problemas con el servicio de sendMessage',
      response: {},
      status: 422,
    };

    try {
      const data1 = {
        where: 'mail.controlador = :controlador AND mail.estado = :estado',
        value: { controlador: 0, estado: 0 },
      };
      response = await this.correoQueryService.selectMail(data1);

      const userData = response.response['mail_correo'];
      const encryptPassword = response.response['mail_password'];
      const decryptPassword = await cryptojs.AES.decrypt(
        encryptPassword,
        process.env.KEY,
      );
      const decryptedData = JSON.parse(
        decryptPassword.toString(cryptojs.enc.Utf8),
      );

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: userData,
          pass: decryptedData,
        },
        logger: true,
        transactionLog: true,
        allowInternalNetworkInterfaces: false,
      });

      interface dataArchivos {
        filename: string;
        content: string;
        encoding: string;
      }
      const arrayArchivos = [];
      let condi = 0;

      while (data.adjuntos[condi] != undefined) {
        const valida: dataArchivos = {
          filename: data.adjuntos[condi].file,
          content: data.adjuntos[condi].base64,
          encoding: 'base64',
        };
        arrayArchivos.push(valida);
        condi++;
      }

      const message = {
        from: userData,
        to: `${data.correo}`,
        subject: `${data.asunto}`,
        html: `${data.mensaje}`,
        attachments: arrayArchivos,
      };

      await transporter.sendMail(message);

      const contador = response.response['mail_contador'] + 1;
      const numerador = response.response['mail_numerador'] + 1;
      await this.correoQueryService.updateContador(
        response.response['mail_id'],
        contador,
        numerador,
      );

      response.error = false;
      response.message = 'Se logró enviar el correo correctamente';
      response.response = userData;
      response.status = 200;
    } catch (error) {
      response.response = error;
      response.status = 500;
    }

    return response;
  }

  async saveLogs(data: any): Promise<IResponse> {
    const response: IResponse = {
      error: true,
      message: 'Existe problemas con el servicio saveLogs.',
      response: {},
      status: 422,
    };

    try {
      const log = new this.mailDocument(data);
      await log.save();

      response.error = false;
      response.message = 'Se registraron los logs correctamente';
      response.response = {};
      response.status = 200;
    } catch (error) {
      response.response = error;
      response.status = 500;
    }

    return response;
  }
}
