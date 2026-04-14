import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware Dasar
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple Test Route
app.get('/', (req, res) => {
  res.send('OpenJob API is running... Level Up!');
});

// Placeholder untuk Routes nanti

export default app;