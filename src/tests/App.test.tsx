import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from '../App';

describe('App component', () => {
  test('should render App component', () => {
    render(<App />);

    const property = screen.getByText('Home');

    expect(property).toBeInTheDocument();
  });

  test('should render People component after pressing the corresponding button', async () => {
    render(<App />);

    const button = screen.getAllByText('People')[1];

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('People:')).toBeInTheDocument();
    });
  });

  test('should render StarShips component after pressing the corresponding button', async () => {
    render(<App />);

    const button = screen.getAllByText('Starships')[1];

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Starships:')).toBeInTheDocument();
    });
  });

  test('should render Planets component after pressing the corresponding button', async () => {
    render(<App />);

    const button = screen.getAllByText('Planets')[1];

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Planets:')).toBeInTheDocument();
    });
  });
});
