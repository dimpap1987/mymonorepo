import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema()
export class User extends Document {
  @Prop({ index: true, unique: true, required: true })
  username: string

  @Prop({ required: true, index: true, unique: true })
  email: string

  @Prop()
  enabled?: boolean

  @Prop()
  createdAt?: string

  @Prop()
  updatedAt?: string

  @Prop()
  lastLoggedIn?: string

  @Prop({ type: [String], enum: ['ADMIN', 'USER'], required: true })
  roles: string[]

  // @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'UserSocialProvider' }] })
  // userSocialProvider?: UserSocialProvider[]
}

export const UserSchema = SchemaFactory.createForClass(User)
