import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema()
export class User {
  @Prop({ required: true })
  id?: string

  @Prop({ index: true, unique: true })
  username?: string

  @Prop({ required: true, index: true, unique: true })
  email?: string

  @Prop()
  emailVerified?: boolean

  @Prop()
  enabled?: boolean

  @Prop()
  createdAt?: string

  @Prop()
  updatedAt?: string

  @Prop()
  lastLoggedIn?: string

  @Prop({ type: [String], enum: ['ADMIN', 'USER'], required: true })
  roles?: string[]
}

export const UserSchema = SchemaFactory.createForClass(User)
