import mongoose, { Schema, Document } from 'mongoose'
import { ExerciseInterface } from '../exercises/Exercise'
import { UserInterface } from '../users/User'

export interface DietInterface extends Document {
  name: String
  exercises: ExerciseInterface[]
  userId: UserInterface['_id']
}

const schema = new Schema(
  {
    name: { type: String, required: [true, 'Name required'] },
    exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
)

export const Diet = mongoose.model<DietInterface>('Diet', schema)
