<p align="center">
 <img width="200px" height="200px" src="./habbits_logo.svg">
</p>

# Habbits

![GitHub](https://img.shields.io/github/license/jesussilva/habbits?style=for-the-badge)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/jesussilva/habbits?style=for-the-badge)
![GitHub package.json version](https://img.shields.io/github/package-json/v/jesussilva/habbits?style=for-the-badge)
![GitHub top language](https://img.shields.io/github/languages/top/jesussilva/habbits?style=for-the-badge)
![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=for-the-badge)

&nbsp;

## Description:

Habbits addresses a common misconception in many nutritionist and personal trainer clinics. Most clinics still use a word, pdf or excel file to create diets and workout plans. That's why Habbits was born, to provide a dashboard where every nutritionist or trainer can keep an exhaustive control of their clients with total transparency.

Habbits aims to provide the following tools:

- To be able to schedule appointments and have these appointments sent via email to clients with all the information of the appointment.
- Keep track of weight, height, measurements and percentages of a client.
- Generate training routines.
- Generate diets according to a client's needs.

&nbsp;

## Models:

```yaml
- Client
    - name: String
    - dateOfBirth: String
    - email: String
    - documentType: String
    - documentID: String
    - address: String
    - city: String
    - zip: Number
    - province: String
    - country: String

- Measures
    - date: Number
    - height: Number
    - weight: Number
    - arm: Number
    - breast: Number
    - waist: Number
    - hip: Number
    - legs: Number
    - clientId: ObjectId('Client')

- Training
    - exercisesIds: [ObjectId('Exercises')]
    - clientId: ObjectId('Client')

- Exercise
    - date: String
    - name: String
    - description: String
    - mechanics: String
    - muscle: String
    - material: String
    - level: String
    - image: String

- Diet
    - dayId: ObjectId('Day')
    - clientId: ObjectId('Client')

- Day
    - date: String
    - breakfast: String
    - midmorning: String
    - meals: String
    - snack: String
    - dinner: String
    - instructions: String
    - observations: String
    - clientId: ObjectId('Client')
```

&nbsp;

## API:

Under development

&nbsp;

## Commands

Under development

&nbsp;

## License:

**_MIT - Massachusetts Institute of Technology_**
