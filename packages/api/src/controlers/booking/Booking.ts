import { Exclude, Expose } from 'class-transformer'
import mongoose, { Schema, Document } from 'mongoose'

export interface BookingInterface extends Document {
  date: Number
  userId: String
  description: String
  latitude: String
  longitude: String
  address: String
}

@Exclude()
export class BookingClass {
  @Expose({ name: '_id' }) id!: string
  @Expose() date!: Number
  @Expose() userId!: String
  @Expose() description!: String
  @Expose() latitude!: String
  @Expose() longitude!: String
  @Expose() address!: String
}

const schema = new Schema(
  {
    date: {
      type: String,
      unique: true,
      required: [true, 'Date required']
    },
    userId: { type: String, required: [true, 'userId required'] },
    description: { type: String },
    latitude: { type: String },
    longitude: { type: String },
    address: { type: String }
  },
  {
    timestamps: true
  }
)

export const Booking = mongoose.model<BookingInterface>('Booking', schema)
