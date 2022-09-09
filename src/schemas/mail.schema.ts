import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MailDocument = Mail & Document;

@Schema()
export class Mail {
  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Object })
  origenMail: any;

  @Prop({ type: Object })
  destinoMail: any;

  @Prop({ type: Object })
  origen: any;
}

export const MailSchema = SchemaFactory.createForClass(Mail);
