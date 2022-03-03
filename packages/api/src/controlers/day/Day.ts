import { Exclude, Expose } from 'class-transformer'
import mongoose, { Schema, Document } from 'mongoose'

export interface DayInterface extends Document {
  date: Number
  breakfast: String
  midmorning: String
  meals: String
  snack: String
  dinner: String
}

@Exclude()
export class DayClass {
  @Expose({ name: '_id' }) id!: string
  @Expose() date!: Number
  @Expose() breakfast!: String
  @Expose() midmorning!: String
  @Expose() meals!: String
  @Expose() snack!: String
  @Expose() dinner!: String
}

const schema = new Schema(
  {
    date: {
      type: Number,
      enum: {
        values: [0, 1, 2, 3, 4, 5, 6],
        message: '{VALUE} is not supported'
      },
      required: [true, 'Date required']
    },
    breakfast: { type: String, required: [true, 'Breakfast required'] },
    midmorning: { type: String, required: [true, 'Midmorning required'] },
    meals: { type: String, required: [true, 'Meals required'] },
    snack: { type: String, required: [true, 'Snack required'] },
    dinner: { type: String, required: [true, 'Dinner required'] }
  },
  {
    timestamps: true
  }
)

export const Day = mongoose.model<DayInterface>('Day', schema)
