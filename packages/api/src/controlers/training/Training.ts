import { Exclude, Expose } from 'class-transformer'
import mongoose, { Schema, Document } from 'mongoose'
import { ExerciseClass, ExerciseInterface } from '../exercise/Exercise'
import { UserInterface } from '../user/User'

export interface TrainingInterface extends Document {
  name: String
  description: String
  user: UserInterface
  exercises: ExerciseInterface['_id']
}

@Exclude()
export class TrainingClass {
  @Expose({ name: '_id' }) id!: string
  @Expose() name!: string
  @Expose() description!: string
  @Expose() user!: UserInterface
  @Expose() exercises!: ExerciseClass[]
}

const schema = new Schema(
  {
    name: { type: String, required: [true, 'Name required'] },
    description: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }]
  },
  {
    timestamps: true
  }
)

export const Training = mongoose.model<TrainingInterface>('Training', schema)
