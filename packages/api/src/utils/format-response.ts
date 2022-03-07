import { plainToInstance } from 'class-transformer'
import { DayClass } from '../controlers/day/Day'
import { DietClass } from '../controlers/diet/Diet'
import { ExerciseClass } from '../controlers/exercise/Exercise'
import { TrainingClass } from '../controlers/training/Training'

export function FormatResponse(model: any, response: any, type: string = 'normal') {
  if (Array.isArray(response)) {
    if (type === 'diet') {
      response = response as DietClass[]
      response = response.map((diet: any) => {
        diet = plainToInstance(DietClass, JSON.parse(JSON.stringify(diet)))
        diet.days = diet.days.map((day: DayClass) => plainToInstance(DayClass, JSON.parse(JSON.stringify(day))))
        return diet
      })

      return response
    } else if (type === 'training') {
      response = response as TrainingClass[]
      response = response.map((training: any) => {
        training = plainToInstance(TrainingClass, JSON.parse(JSON.stringify(training)))
        training.exercises = training.exercises.map((exercises: ExerciseClass) =>
          plainToInstance(ExerciseClass, JSON.parse(JSON.stringify(exercises)))
        )
        return training
      })

      return response
    } else if (type === 'normal') {
      return response.map((item: any) => plainToInstance(model, JSON.parse(JSON.stringify(item))))
    }
  } else {
    return plainToInstance(model, JSON.parse(JSON.stringify(response)))
  }
}
