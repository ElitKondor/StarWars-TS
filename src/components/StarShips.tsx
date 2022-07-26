import React, { useState, useEffect } from 'react';
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

export const StarShips = () => {
  const [starShips, setStarShips] = useState<object[]>([]);

  useEffect(() => {
    const fetchedShips = localStorage.getItem('starships');

    if (!fetchedShips) {
      (async function () {
        const data = await getContent('starships');
        setStarShips(data);
      })();
    } else {
      setStarShips(JSON.parse(fetchedShips!));
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
  }, [starShips]);

  return (
    <Container maxWidth='lg'>
      <h1>Starships:</h1>
      <Grid container spacing={2}>
        {starShips.map((starShip: any, i: number) => {
          return (
            <Grid className='grid-item' key={uuid()} item xs={6} md={4} lg={3}>
              <Card>
                <CardMedia
                  component='img'
                  height='250'
                  src={getImageLink('starships', i + 6)}
                  alt='StarShip image'
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
                    {starShip.name}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color='text.secondary'>
                    Length: {starShip.length}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color='text.secondary'>
                    Passengers: {starShip.passengers}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color='text.secondary'>
                    Class: {starShip.starship_class}
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
