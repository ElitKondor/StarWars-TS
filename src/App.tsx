import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { v4 as uuid } from 'uuid';

import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import './App.css';

const People = React.lazy(() =>
  import('./components/People').then(({ People }: any) => ({
    default: People,
  }))
);
const Planets = React.lazy(() =>
  import('./components/Planets').then(({ Planets }: any) => ({
    default: Planets,
  }))
);
const StarShips = React.lazy(() =>
  import('./components/StarShips').then(({ StarShips }: any) => ({
    default: StarShips,
  }))
);

const App: Function = () => {
  const pages: [JSX.Element, string][] = [
    [<People />, '/people'],
    [<Planets />, '/planets'],
    [<StarShips />, '/starships'],
  ];

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          {pages.map((elem: [JSX.Element, string]) => {
            return (
              <Route
                path={elem[1]}
                key={uuid()}
                element={
                  <Suspense fallback={<CircularProgress />}>{elem[0]}</Suspense>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </>
  );
};

export default App;
