import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes, Types } from 'mongoose'
import { User } from './user-schema'

export type UserSocialProviderDocument = UserSocialProvider & Document

@Schema({ collection: 'user-social-providers' })
export class UserSocialProvider extends Document {
  @Prop({ type: String, enum: ['github', 'google', 'facebook'], required: true })
  name: string

  @Prop({ required: true })
  providerUserId: string

  @Prop()
  picture?: string

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  user: User | Types.ObjectId
}

export const UserSocialProviderSchema = SchemaFactory.createForClass(UserSocialProvider)
