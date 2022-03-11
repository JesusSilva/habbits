export function FormatNewDiet(diet: any) {
  const name = diet.name
  const user = diet.user
  const instructions = diet.instructions
  const observations = diet.observations

  delete diet.name
  delete diet.user
  delete diet.instructions
  delete diet.observations

  const arr = [{}, {}, {}, {}, {}, {}, {}]

  for (const key in diet) {
    if (Object.prototype.hasOwnProperty.call(diet, key)) {
      const element = diet[key]

      const date = parseInt(key.split('-')[0])
      arr[date] = { date, ...arr[date], [key.split('-')[1]]: element }
    }
  }

  const dietFormated = {
    name,
    user,
    instructions,
    observations,
    days: arr
  }

  console.log(dietFormated)
  return dietFormated
}
