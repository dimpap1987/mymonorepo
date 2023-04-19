import { UsernameValidator } from '@mymonorepo/validators'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document
const usernameValidator = new UsernameValidator()

@Schema({ collection: 'users' })
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
}

export const UserSchema = SchemaFactory.createForClass(User)
