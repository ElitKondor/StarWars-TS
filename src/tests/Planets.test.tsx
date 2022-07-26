import React from 'react';
import { render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { faker } from '@faker-js/faker';
import '@testing-library/jest-dom';

import { Planets } from '../components/Planets';

const mockedData = {
  results: [
    {
      name: faker.name.findName(),
      climate: faker.word.adjective(),
      terrain: faker.word.adjective(),
      population: faker.datatype.number(),
    },
  ],
};

const server = setupServer(
  rest.get('https://swapi.dev/api/planets', (req, res, ctx) => {
    return res(ctx.json(mockedData));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Planets component', () => {
  test('should render Planets component', async () => {
    render(<Planets />);

    const result = await screen.findByText(
      'Climate: ' + mockedData.results[0].climate
    );

    expect(result).toBeInTheDocument();
  });

  test('should fail fetching', async () => {
    server.use(
      rest.get('https://swapi.dev/api/planets', (req, res, ctx) => {
        return res(ctx.status(404), ctx.json({}));
      })
    );
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });

    render(<Planets />);

    // const result = await new Planets.planetsFetcher()

    expect(window.localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  test('should not find corresponding localStorage key', () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => '[{"data": 3}]'),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });

    render(<Planets />);

    expect(window.localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});
