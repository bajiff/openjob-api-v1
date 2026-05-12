import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import routes from './routes/index.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes); 

app.get('/', (req, res) => {
  res.send('OpenJob API is running... Level Up!');
});


app.use(notFound);

app.use(errorHandler);

export default app;