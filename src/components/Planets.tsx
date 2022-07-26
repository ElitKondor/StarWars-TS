import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
} from '@mui/material';
import { v4 as uuid } from 'uuid';
import { gsap } from 'gsap';

import { getContent, getImageLink } from '../utils/api';

export const Planets = () => {
  const [planets, setPlanets] = useState<object[]>([]);

  useEffect(() => {
    const fetchedPlanets = localStorage.getItem('planets');

    if (!fetchedPlanets) {
      (async function () {
        const data = await getContent('planets');
        setPlanets(data);
      })();
    } else {
      setPlanets(JSON.parse(fetchedPlanets!));
    }
  }, []);

  useEffect(() => {
    gsap.from('.grid-item', {
      duration: 1,
      delay: 1,
      opacity: 0,
      stagger: 0.5,
    });

    const images: NodeListOf<HTMLImageElement> =
      document.querySelectorAll('.MuiCardMedia-root');
    images.forEach((img) => {
      img.addEventListener('error', () => {
        const defaultImage =
          'https://starwars-visualguide.com/assets/img/big-placeholder.jpg';

        img.src = defaultImage;
        img.alt = 'Default Template';
      });
    });
  }, [planets]);

  return (
    <Container maxWidth='lg'>
      <h1 id='header'>Planets: </h1>
      <Grid id='main-grid' container spacing={2}>
        {planets.map((planet: any, i: number) => {
          return (
            <Grid className='grid-item' key={uuid()} item xs={6} md={4} lg={3}>
              <Card>
                <CardMedia
                  component='img'
                  height='250'
                  src={getImageLink('planets', i + 1)}
                  alt='Planet image'
                  sx={{
                    objectFit: 'contain',
                  }}
                />
                <CardContent>
                  <Typography
                    variant='h5'
                    component='div'
                    color='text.secondary'
                  >
                    {planet.name}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color='text.secondary'>
                    Climate: {planet.climate}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color='text.secondary'>
                    Terrain: {planet.terrain}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color='text.secondary'>
                    Population: {planet.population}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
