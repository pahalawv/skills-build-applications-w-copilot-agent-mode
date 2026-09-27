import 'dotenv/config';
import app from './app.js';
import { connectToDatabase } from './config/database.js';

const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

try {
  await connectToDatabase();
  app.listen(port, '0.0.0.0', () => {
    console.log(`Octofit API listening at ${baseUrl}`);
  });
} catch (error) {
  console.error('Unable to start Octofit API:', error);
  process.exit(1);
}