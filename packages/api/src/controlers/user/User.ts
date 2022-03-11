import mongoose, { Schema, Document } from 'mongoose'
import { Expose, Exclude } from 'class-transformer'

export interface UserInterface extends Document {
  name: String
  dateOfBirth: Number
  email: String
  phone: Number
  documentType: String
  documentID: String
  address: String
  city: String
  zip: Number
  province: String
  country: String
}

@Exclude()
export class UserClass {
  @Expose({ name: '_id' }) id!: string
  @Expose() name!: string
  @Expose() dateOfBirth!: number
  @Expose() email!: string
  @Expose() phone!: number
  @Expose() documentType!: string
  @Expose() documentID!: string
  @Expose() address!: string
  @Expose() city!: string
  @Expose() zip!: number
  @Expose() province!: string
  @Expose() country!: string
}

const schema = new Schema(
  {
    name: { type: String, required: [true, 'Name required'] },
    dateOfBirth: { type: Number, required: [true, 'DateOfBirth required'] },
    email: { type: String, unique: true, required: [true, 'Email required'] },
    phone: { type: String, unique: true, required: [true, 'Phone required'] },
    documentType: { type: String, required: [true, 'DocumentType required'] },
    documentID: { type: String, unique: true, required: [true, 'DocumentID required'] },
    address: { type: String },
    city: { type: String },
    zip: { type: String },
    province: { type: String },
    country: { type: String }
  },
  {
    timestamps: true
  }
)

export const User = mongoose.model<UserInterface>('User', schema)
