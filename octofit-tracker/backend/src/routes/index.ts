import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';
import { createResourceRouter } from './resourceRouter.js';

export const usersRouter = createResourceRouter(User);
export const teamsRouter = createResourceRouter(Team);
export const activitiesRouter = createResourceRouter(Activity);
export const leaderboardRouter = createResourceRouter(LeaderboardEntry, {
  sort: { points: -1, createdAt: 1 },
});
export const workoutsRouter = createResourceRouter(Workout);