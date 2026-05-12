import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

app.listen(PORT, HOST, () => {
  console.log(`✨ Server berjalan di http://${HOST}:${PORT} ✨`);
});