import { Exclude, Expose } from 'class-transformer'
import mongoose, { Schema, Document } from 'mongoose'
import { UserClass, UserInterface } from '../user/User'

export interface BookingInterface extends Document {
  date: Number
  user: UserInterface
  description: String
  latitude: Number
  longitude: Number
  address: String
}

@Exclude()
export class BookingClass {
  @Expose({ name: '_id' }) id!: string
  @Expose() date!: number
  @Expose() user!: UserClass
  @Expose() description!: string
  @Expose() latitude!: number
  @Expose() longitude!: number
  @Expose() address!: string
}

const schema = new Schema(
  {
    date: {
      type: Number,
      unique: true,
      required: [true, 'Date required']
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'userId required'] },
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
