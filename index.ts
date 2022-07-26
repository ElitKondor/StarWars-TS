// // import { v4 as uuid } from 'uuid';

// // console.log(uuid());

// let requestData: object;

// fetch(
//   'https://api.carsxe.com/images?key=hnge4xn73_tj2e6n59o_0qxj3omvi&make=Chevy&model=Equinox&year=2018&color=black&angle=side',
//   {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       name: 'User1',
//     }),
//   }
// )
//   .then((res) => {
//     return res.json();
//   })
//   .then((data) => console.log(data))
//   .catch(() => console.log('ERROR!!!'));

// // console.log(requestData);

import axios from 'axios';

const getCar: Function = async () => {
  await axios
    .get(
      // method: 'GET',
      // url: 'https://reqres.in/api/users',
      'https://api.carsxe.com/images?key=hnge4xn73_tj2e6n59o_0qxj3omvi&make=Chevy&model=Equinox&year=2018&color=black&angle=side?format=json'
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      // },
    )
    .then((res) => {
      console.log(res);
    })
    // .then((res) => console.log(res))
    .catch((err) => console.log(err));

  return {};
};

getCar();
