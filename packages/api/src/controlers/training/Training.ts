import { Exclude, Expose } from 'class-transformer'
import mongoose, { Schema, Document } from 'mongoose'
import { ExerciseClass, ExerciseInterface } from '../exercise/Exercise'
import { UserInterface } from '../user/User'

export interface TrainingInterface extends Document {
  name: String
  exercises: ExerciseInterface['_id']
  userId: UserInterface['_id']
}

@Exclude()
export class TrainingClass {
  @Expose({ name: '_id' }) id!: string
  @Expose() name!: string
  @Expose() exercises!: ExerciseClass[]
  @Expose() userId!: UserInterface['_id']
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

export const Training = mongoose.model<TrainingInterface>('Training', schema)
