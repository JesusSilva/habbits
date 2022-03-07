import { Exclude, Expose } from 'class-transformer'
import mongoose, { Schema, Document } from 'mongoose'
import { ExerciseClass, ExerciseInterface } from '../exercise/Exercise'
import { UserInterface } from '../user/User'

export interface TrainingInterface extends Document {
  name: String
  userId: UserInterface['_id']
  exercises: ExerciseInterface['_id']
}

@Exclude()
export class TrainingClass {
  @Expose({ name: '_id' }) id!: string
  @Expose() name!: string
  @Expose() userId!: UserInterface['_id']
  @Expose() exercises!: ExerciseClass[]
}

const schema = new Schema(
  {
    name: { type: String, required: [true, 'Name required'] },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }]
  },
  {
    timestamps: true
  }
)

export const Training = mongoose.model<TrainingInterface>('Training', schema)
