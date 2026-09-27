import express, { type ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import {
  activitiesRouter,
  leaderboardRouter,
  teamsRouter,
  usersRouter,
  workoutsRouter,
} from './routes/index.js';

const app = express();

app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400).json({ error: 'Invalid resource data' });
    return;
  }

  if (typeof error === 'object' && error !== null && 'code' in error && error.code === 11000) {
    res.status(409).json({ error: 'Resource already exists' });
    return;
  }

  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
};

app.use(errorHandler);

export default app;