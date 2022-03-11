import { plainToInstance } from 'class-transformer'
import { BookingClass } from '../controlers/booking/Booking'
import { DayClass } from '../controlers/day/Day'
import { DietClass } from '../controlers/diet/Diet'
import { ExerciseClass } from '../controlers/exercise/Exercise'
import { MeasureClass } from '../controlers/measurements/Measure'
import { TrainingClass } from '../controlers/training/Training'
import { UserClass } from '../controlers/user/User'

export function FormatResponse(model: any, response: any, type: string = 'normal') {
  if (Array.isArray(response)) {
    if (type === 'diet') {
      response = response as DietClass[]
      response = response.map((diet: any) => {
        diet = plainToInstance(DietClass, JSON.parse(JSON.stringify(diet)))
        diet.days = diet.days.map((day: DayClass) => plainToInstance(DayClass, JSON.parse(JSON.stringify(day))))
        diet.user = plainToInstance(UserClass, JSON.parse(JSON.stringify(diet.user)))
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
      console.log(response)
      return response
    } else if (type === 'booking') {
      response = response as BookingClass[]
      response = response.map((booking: any) => {
        booking = plainToInstance(BookingClass, JSON.parse(JSON.stringify(booking)))
        booking.user = plainToInstance(UserClass, JSON.parse(JSON.stringify(booking.user)))

        return booking
      })

      return response
    } else if (type === 'measure') {
      response = response as MeasureClass[]
      response = response.map((measure: any) => {
        measure = plainToInstance(MeasureClass, JSON.parse(JSON.stringify(measure)))
        measure.user = plainToInstance(UserClass, JSON.parse(JSON.stringify(measure.user)))

        return measure
      })

      return response
    } else if (type === 'normal') {
      return response.map((item: any) => plainToInstance(model, JSON.parse(JSON.stringify(item))))
    }
  } else if (type === 'diet') {
    response = response as DietClass
    response = plainToInstance(DietClass, JSON.parse(JSON.stringify(response)))
    response.days = response.days.map((day: DayClass) => plainToInstance(DayClass, JSON.parse(JSON.stringify(day))))
    response.user = plainToInstance(UserClass, JSON.parse(JSON.stringify(response.user)))

    return response
  } else {
    return plainToInstance(model, JSON.parse(JSON.stringify(response)))
  }
}
