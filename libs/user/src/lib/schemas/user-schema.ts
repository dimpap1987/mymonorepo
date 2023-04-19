import { UsernameValidator } from '@mymonorepo/validators'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose'
import { UserSocialProvider } from './user-social-provider-schema'

export type UserDocument = User & Document
const usernameValidator = new UsernameValidator()

@Schema({ collection: 'user' })
export class User extends Document {
  @Prop({
    index: true,
    unique: true,
    required: true,
    validate: {
      validator: username => usernameValidator.validate(username),
      message: () => usernameValidator.getErrorMessage(),
    },
  })
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

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'UserSocialProvider' }] })
  userSocialProvider?: UserSocialProvider[]
}

export const UserSchema = SchemaFactory.createForClass(User)
