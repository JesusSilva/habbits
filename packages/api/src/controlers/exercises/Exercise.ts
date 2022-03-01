import mongoose, { Schema, Document } from 'mongoose'

export interface ExerciseInterface extends Document {
  name: String
  description: String
  mechanics: String
  muscle: String
  material: String
  level: String
  image: String
}

const schema = new Schema(
  {
    name: { type: String, required: [true, 'Name required'] },
    description: { type: String, required: [true, 'Description required'] },
    mechanics: { type: String, required: [true, 'Mechanics required'] },
    muscle: { type: String, required: [true, 'Muscle required'] },
    material: { type: String, required: [true, 'Material required'] },
    level: { type: String, required: [true, 'Level required'] },
    image: { type: String, required: [true, 'Image required'] }
  },
  {
    timestamps: true
  }
)

export const Exercise = mongoose.model<ExerciseInterface>('Exercise', schema)
