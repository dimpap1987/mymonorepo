import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UnRegisteredUserDocument = UnRegisteredUser & Document

@Schema()
export class UnRegisteredUser extends Document {
  @Prop({ required: true })
  uuid: string

  @Prop({ required: true, index: true, unique: true })
  email: string

  @Prop({ required: true })
  provider: string

  @Prop({ required: true })
  jwtJson: string

  @Prop()
  createdAt: string
}

export const UnRegisteredUserSchema = SchemaFactory.createForClass(UnRegisteredUser)
