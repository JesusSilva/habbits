import mongoose, { Schema, Document } from 'mongoose'
import { DayInterface } from '../days/Day'
import { UserInterface } from '../users/User'

export interface DietInterface extends Document {
  name: String
  instructions: String
  observations: String
  days: DayInterface[]
  userId: UserInterface['_id']
}

const schema = new Schema(
  {
    name: { type: String, required: [true, 'Name required'] },
    days: [{ type: Schema.Types.ObjectId, ref: 'Day' }],
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    instructions: { type: String },
    observations: { type: String }
  },
  {
    timestamps: true
  }
)

export const Diet = mongoose.model<DietInterface>('Diet', schema)
