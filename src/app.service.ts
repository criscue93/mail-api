import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DateTime } from 'luxon';
import { IResponse } from './interfaces/IResponse';
import { mailDTO } from './dto/mail.dto';
import * as nodemailer from 'nodemailer';
import { Mail, MailDocument } from './schemas/mail.schema';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
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
    const response: IResponse = {
      error: true,
      message: 'Existen problemas con el servicio de sendMessage',
      response: {},
      status: 422,
    };

    try {
      console.log(data);
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.USER_MAIL,
          pass: process.env.PASSWORD_MAIL,
        },
        logger: true,
        transactionLog: true,
        allowInternalNetworkInterfaces: false,
      });

      const message = {
        from: 'ccuetovargas65@gmail.com',
        to: `${data.to}`,
        subject: `${data.subject}`,
        text: `${data.text}`,
        // html: '',
        // attachments: [
        //   {
        //     filename: 'text1.txt',
        //     content: 'aGVsbG8gd29ybGQh',
        //     encoding: 'base64',
        //   },
        // ],
      };

      await transporter.sendMail(message);

      response.error = false;
      response.message = 'Se logró enviar el correo correctamente';
      response.response = {};
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
