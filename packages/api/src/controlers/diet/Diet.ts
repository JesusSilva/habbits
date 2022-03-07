import { Exclude, Expose } from 'class-transformer'
import mongoose, { Schema, Document } from 'mongoose'
import { DayClass, DayInterface } from '../day/Day'
import { UserInterface } from '../user/User'

export interface DietInterface extends Document {
  name: String
  instructions: String
  observations: String
  userId: UserInterface['_id']
  days: DayInterface[]
}

@Exclude()
export class DietClass {
  @Expose({ name: '_id' }) id!: string
  @Expose() name!: String
  @Expose() instructions!: String
  @Expose() observations!: String
  @Expose() userId!: UserInterface['_id']
  @Expose() days!: DayClass[]
}

const schema = new Schema(
  {
    name: { type: String, required: [true, 'Name required'] },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    days: [{ type: Schema.Types.ObjectId, ref: 'Day' }],
    instructions: { type: String },
    observations: { type: String }
  },
  {
    timestamps: true
  }
)

export const Diet = mongoose.model<DietInterface>('Diet', schema)
