// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';

export const getMockedPeople = () => ({
  results: [
    {
      name: faker.name.findName(),
      gender: faker.name.gender(),
      eye_color: faker.color.human(),
      birth_year: faker.date.birthdate(),
    },
  ],
});

export const getMockedPlanets = () => ({
  results: [
    {
      name: faker.name.findName(),
      climate: faker.word.adjective(),
      terrain: faker.word.adjective(),
      population: faker.datatype.number(),
    },
  ],
});

export const getMockedStarShips = () => ({
  results: [
    {
      name: faker.name.findName(),
      length: faker.datatype.number(),
      passengers: faker.datatype.number(),
      starship_class: faker.word.adjective(),
    },
  ],
});
