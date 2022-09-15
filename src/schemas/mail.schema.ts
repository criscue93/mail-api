import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MailDocument = Mail & Document;

@Schema()
export class Mail {
  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Object })
  origen: any;

  @Prop({ type: Object })
  destino: any;

  @Prop({ type: Boolean })
  enviado: boolean;
}

export const MailSchema = SchemaFactory.createForClass(Mail);
