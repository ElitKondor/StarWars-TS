import React from 'react';
import { render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { faker } from '@faker-js/faker';
import '@testing-library/jest-dom';

import { StarShips } from '../components/StarShips';

const mockedData = {
  results: [
    {
      name: faker.name.findName(),
      length: faker.datatype.number(),
      passengers: faker.datatype.number(),
      starship_class: faker.word.adjective(),
    },
  ],
};

const server = setupServer(
  rest.get('https://swapi.dev/api/starships', (req, res, ctx) => {
    return res(ctx.json(mockedData));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('StarShips component', () => {
  test('StarShips component', async () => {
    render(<StarShips />);

    const result = await screen.findByText(
      'Length: ' + mockedData.results[0].length
    );

    expect(result).toBeInTheDocument();
  });

  test('should not find corresponding localStorage key', () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => '[{"data": 3}]'),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });

    render(<StarShips />);

    expect(window.localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});
