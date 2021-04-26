import express from 'express';
import cors from 'cors';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import { getForecast } from './models/magic-seaweed/api';

const app = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());

app.get('/', async (_req, res) => {
  const remote = await getForecast(1); // type response
  res.json(remote.data);
});

app.listen(PORT, () => {
  return console.log(`server is listening on ${PORT}`);
});
