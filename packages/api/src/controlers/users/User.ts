import mongoose, { Schema, Document } from 'mongoose'

export interface UserInterface extends Document {
  name: String
  dateOfBirth: String
  email: String
  documentType: String
  documentID: String
  address: String
  city: String
  zip: Number
  province: String
  country: String
}

const schema = new Schema(
  {
    name: { type: String, required: [true, 'Name required'] },
    dateOfBirth: { type: String, required: [true, 'DateOfBirth required'] },
    email: { type: String, unique: true, required: [true, 'Email required'] },
    phone: { type: Number, unique: true, required: [true, 'Phone required'] },
    documentType: { type: String, required: [true, 'DocumentType required'] },
    documentID: { type: String, unique: true, required: [true, 'DocumentID required'] },
    address: { type: String },
    city: { type: String },
    zip: { type: Number },
    province: { type: String },
    country: { type: String }
  },
  {
    timestamps: true
  }
)

export const User = mongoose.model<UserInterface>('User', schema)
