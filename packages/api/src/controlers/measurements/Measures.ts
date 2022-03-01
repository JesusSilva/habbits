import mongoose, { Schema, Document } from 'mongoose'
import { UserInterface } from '../users/User'

export interface MeasuresInterface extends Document {
  date: Number
  height: Number
  weight: Number
  arm: Number
  breast: Number
  waist: Number
  hip: Number
  legs: Number
  userId: UserInterface['_id']
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
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
)

export const Measures = mongoose.model<MeasuresInterface>('Measures', schema)
