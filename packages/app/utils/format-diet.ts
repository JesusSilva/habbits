function createRow(comida, lunes, martes, miercoles, jueves, viernes, sabado, domingo) {
  return { comida, lunes, martes, miercoles, jueves, viernes, sabado, domingo }
}

export function FormatRow(diet: any) {
  const rows = [
    createRow(
      'Desayuno',
      diet?.days[0]?.breakfast,
      diet?.days[1]?.breakfast,
      diet?.days[2]?.breakfast,
      diet?.days[3]?.breakfast,
      diet?.days[4]?.breakfast,
      diet?.days[5]?.breakfast,
      diet?.days[6]?.breakfast
    ),
    createRow(
      'Almuerzo',
      diet?.days[0]?.midmorning,
      diet?.days[1]?.midmorning,
      diet?.days[2]?.midmorning,
      diet?.days[3]?.midmorning,
      diet?.days[4]?.midmorning,
      diet?.days[5]?.midmorning,
      diet?.days[6]?.midmorning
    ),
    createRow(
      'Comida',
      diet?.days[0]?.meals,
      diet?.days[1]?.meals,
      diet?.days[2]?.meals,
      diet?.days[3]?.meals,
      diet?.days[4]?.meals,
      diet?.days[5]?.meals,
      diet?.days[6]?.meals
    ),
    createRow(
      'Merienda',
      diet?.days[0]?.snack,
      diet?.days[1]?.snack,
      diet?.days[2]?.snack,
      diet?.days[3]?.snack,
      diet?.days[4]?.snack,
      diet?.days[5]?.snack,
      diet?.days[6]?.snack
    ),
    createRow(
      'Cena',
      diet?.days[0]?.dinner,
      diet?.days[1]?.dinner,
      diet?.days[2]?.dinner,
      diet?.days[3]?.dinner,
      diet?.days[4]?.dinner,
      diet?.days[5]?.dinner,
      diet?.days[6]?.dinner
    )
  ]

  return rows
}
