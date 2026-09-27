import 'dotenv/config';
import app from './app.js';
import { connectToDatabase } from './config/database.js';

const port = 8000;

try {
  await connectToDatabase();
  app.listen(port, '0.0.0.0', () => {
    console.log(`Octofit API listening on port ${port}`);
  });
} catch (error) {
  console.error('Unable to start Octofit API:', error);
  process.exit(1);
}