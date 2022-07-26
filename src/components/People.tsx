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

export const People = () => {
  const [people, setPeople] = useState<object[]>([]);

  useEffect(() => {
    const fetchedPeople = localStorage.getItem('people');

    if (!fetchedPeople) {
      (async function () {
        const data = await getContent('people');
        setPeople(data);
      })();
    } else {
      setPeople(JSON.parse(fetchedPeople!));
    }
  }, []);

  useEffect(() => {
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

    gsap.from('.grid-item', {
      duration: 1,
      delay: 1,
      opacity: 0,
      stagger: 0.5,
    });
  }, [people]);

  return (
    <Container maxWidth='lg'>
      <h1>People:</h1>
      <Grid container spacing={2}>
        {people.map((person: any, i: number) => {
          return (
            <Grid className='grid-item' item key={uuid()} xs={6} md={4} lg={3}>
              <Card>
                <CardMedia
                  component='img'
                  height='300'
                  src={getImageLink('characters', i + 1)}
                  alt='Character image'
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
                    {person.name}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color='text.secondary'>
                    {'Eye color: ' + person.eye_color}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color='text.secondary'>
                    {'Birth year: ' + person.birth_year}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color='text.secondary'>
                    {'Gender: ' + person.gender}
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
