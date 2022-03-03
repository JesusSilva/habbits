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

## Description

Habbits addresses a common misconception in many nutritionist and personal trainer clinics. Most clinics still use a word, pdf or excel file to create diets and workout plans. That's why Habbits was born, to provide a dashboard where every nutritionist or trainer can keep an exhaustive control of their clients with total transparency.

Habbits aims to provide the following tools:

- To be able to schedule appointments and have these appointments sent via email to clients with all the information of the appointment.
- Keep track of weight, height, measurements and percentages of a client.
- Generate training routines.
- Generate diets according to a client's needs.

&nbsp;

## Models

```yaml
- Users
    - name: String
    - dateOfBirth: String
    - email: String
    - email: Number
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
    - userId: ObjectId('User')

- Training
    - name: String
    - exercises: [ObjectId('Exercises')]
    - userId: ObjectId('User')

- Exercise
    - name: String
    - description: String
    - mechanics: String
    - muscle: String
    - material: String
    - level: String
    - image: String

- Diet
    - name: String
    - days: [ObjectId('Day')]
    - instructions: String
    - observations: String
    - userId: ObjectId('User')

- Day
    - date: Number
    - breakfast: String
    - midmorning: String
    - meals: String
    - snack: String
    - dinner: String

- Booking
    - date: Number
    - userId: String
    - description: String
    - latitude: String
    - longitude: String
    - address: String
```

&nbsp;

## API

```yaml
🏷️  Routes:
  - USERS: 
      ├── GET     /users
      ├── GET     /users/:id
      ├── POST    /users
      ├── PATCH   /users/:id
      └── DELETE  /users/:id

  - MEASURES: 
      ├── GET     /measures
      ├── GET     /measures/:id
      ├── POST    /measures
      ├── PATCH   /measures/:id
      └── DELETE  /measures/:id

  - EXERCISES: ├── GET     /exercises
      ├── GET     /exercises/:id
      ├── POST    /exercises
      ├── PATCH   /exercises/:id
      └── DELETE  /exercises/:id

  - TRAININGS: 
      ├── GET     /trainings
      ├── GET     /trainings/:id
      ├── POST    /trainings
      ├── PATCH   /trainings/:id
      └── DELETE  /trainings/:id

  - DAYS: 
      ├── GET     /days
      ├── GET     /days/:id
      ├── POST    /days
      ├── PATCH   /days/:id
      └── DELETE  /days/:id

  - DIETS: 
      ├── GET     /diets
      ├── GET     /diets/:id
      ├── POST    /diets
      ├── PATCH   /diets/:id
      └── DELETE  /diets/:id

  - BOOKINGS: 
      ├── GET     /bookings
      ├── GET     /bookings/:id
      ├── POST    /bookings
      ├── PATCH   /bookings/:id
      └── DELETE  /bookings/:id
```

&nbsp;

## Commands

| Name        | Package | Command                                     | Description                                    |
| ----------- | ------- | ------------------------------------------- | ---------------------------------------------- |
| server:dev  | api     | "yarn workspace habbits-back dev"           | Run api in development mode                    |
| client:dev  | app     | "yarn workspace habbits-front dev"          | Run app in development mode                    |
| dev         | general | "npm-run-all -l -p server:dev client:dev"   | Run api and app in development mode            |
| prepare     | general | "husky install"                             | Install husky when downloading the application |
| pre-commit  | general | "lint-staged"                               | Run lint-staged before committing              |
| server:lint | api     | "yarn workspace habbits-back lint"          | Execute linter in the api                      |
| client:lint | app     | "yarn workspace habbits-front lint"         | Execute linter in the app                      |
| lint        | general | "npm-run-all -l -p server:lint client:lint" | Execute linter in the api and app              |
| commit      | general | "cz"                                        | Execute commitizen                             |

&nbsp;

## License

**_MIT - Massachusetts Institute of Technology_**
