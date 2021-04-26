if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import express from 'express';
import * as path from 'path';
import cors from 'cors';

import baseRoutes from './routes';
import magicSeaweedRoutes from './routes/magic-seaweed';

const app = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());

app.use(express.static(path.resolve(__dirname, '../../client/build/')));

app.use('/magic_seaweed', magicSeaweedRoutes);
app.use('*', baseRoutes);

app.listen(PORT, () => {
  return console.log(`server is listening on ${PORT}`);
});
