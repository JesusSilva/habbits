import { Exclude, Expose } from 'class-transformer'
import mongoose, { Schema, Document } from 'mongoose'

export interface BookingInterface extends Document {
  date: Number
  userId: String
  description: String
  latitude: Number
  longitude: Number
  address: String
}

@Exclude()
export class BookingClass {
  @Expose({ name: '_id' }) id!: string
  @Expose() date!: Number
  @Expose() userId!: String
  @Expose() description!: String
  @Expose() latitude!: Number
  @Expose() longitude!: Number
  @Expose() address!: String
}

const schema = new Schema(
  {
    date: {
      type: String,
      unique: true,
      required: [true, 'Date required']
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'userId required'] },
    description: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    address: { type: String }
  },
  {
    timestamps: true
  }
)

export const Booking = mongoose.model<BookingInterface>('Booking', schema)
