import { Exclude, Expose } from 'class-transformer'
import mongoose, { Schema, Document } from 'mongoose'
import { UserInterface } from '../user/User'

export interface MeasureInterface extends Document {
  date: Number
  height: Number
  weight: Number
  arm: Number
  breast: Number
  waist: Number
  hip: Number
  legs: Number
  user: UserInterface
}

@Exclude()
export class MeasureClass {
  @Expose({ name: '_id' }) id!: string
  @Expose() date!: Number
  @Expose() height!: Number
  @Expose() weight!: Number
  @Expose() arm!: Number
  @Expose() breast!: Number
  @Expose() waist!: Number
  @Expose() hip!: Number
  @Expose() legs!: Number
  @Expose() user!: UserInterface
}

const schema = new Schema(
  {
    date: { type: String, required: [true, 'Date required'] },
    height: { type: Number, required: [true, 'Height required'] },
    weight: { type: Number, required: [true, 'Weight required'] },
    arm: { type: Number, required: [true, 'Arm required'] },
    breast: { type: Number, required: [true, 'Breast required'] },
    waist: { type: Number, required: [true, 'Waist required'] },
    hip: { type: Number, required: [true, 'Hip required'] },
    legs: { type: Number, required: [true, 'Legs required'] },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
)

export const Measure = mongoose.model<MeasureInterface>('Measure', schema)
