import React from 'react';
import { render, screen, fireEvent, createEvent } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import '@testing-library/jest-dom';
import { faker } from '@faker-js/faker';

import { People } from '../components/People';

const mockedData = {
  results: [
    {
      name: faker.name.findName(),
      gender: faker.name.gender(),
      eye_color: faker.color.human(),
      birth_year: faker.date.birthdate(),
    },
  ],
};

const server = setupServer(
  rest.get('https://swapi.dev/api/people', (req, res, ctx) => {
    return res(ctx.json(mockedData));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('People component', () => {
  test('should render component', async () => {
    render(<People />);

    const result = await screen.findByText(
      'Eye color: ' + mockedData.results[0].eye_color
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

    render(<People />);

    expect(window.localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});
