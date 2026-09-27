import mongoose from 'mongoose';
import { connectToDatabase } from '../config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const seedUsers = [
  { username: 'octo.runner', displayName: 'Avery Runner', email: 'avery@example.test' },
  { username: 'octo.strength', displayName: 'Jordan Strong', email: 'jordan@example.test' },
];

const seedWorkouts = [
  {
    name: 'Campus Loop',
    description: 'A steady-paced run around the school grounds.',
    category: 'running',
    difficulty: 'beginner',
    durationMinutes: 20,
  },
  {
    name: 'Bodyweight Circuit',
    description: 'A short circuit of squats, push-ups, and planks.',
    category: 'strength',
    difficulty: 'beginner',
    durationMinutes: 15,
  },
  {
    name: 'Recovery Walk',
    description: 'An easy walk to build a consistent movement habit.',
    category: 'walking',
    difficulty: 'beginner',
    durationMinutes: 25,
  },
];

/**
 * Upsert predictable demo data without removing unrelated database records.
 */
async function seedDatabase() {
  try {
    await connectToDatabase();

    const [runner, strengthAthlete] = await Promise.all(
      seedUsers.map((user) =>
        User.findOneAndUpdate({ email: user.email }, { $set: user }, { upsert: true, new: true }).exec(),
      ),
    );

    const [comets, tides] = await Promise.all([
      Team.findOneAndUpdate(
        { name: 'Coral Comets' },
        { $set: { name: 'Coral Comets', description: 'A team focused on steady progress.', members: [runner._id] } },
        { upsert: true, new: true },
      ).exec(),
      Team.findOneAndUpdate(
        { name: 'Tidal Titans' },
        {
          $set: {
            name: 'Tidal Titans',
            description: 'A team that makes every workout count.',
            members: [strengthAthlete._id],
          },
        },
        { upsert: true, new: true },
      ).exec(),
    ]);

    const activities = [
      {
        user: runner._id,
        type: 'running',
        durationMinutes: 24,
        distanceKm: 3.2,
        calories: 210,
        completedAt: new Date('2026-09-20T15:00:00.000Z'),
      },
      {
        user: runner._id,
        type: 'walking',
        durationMinutes: 30,
        distanceKm: 2.1,
        calories: 115,
        completedAt: new Date('2026-09-22T15:00:00.000Z'),
      },
      {
        user: strengthAthlete._id,
        type: 'strength',
        durationMinutes: 20,
        calories: 145,
        completedAt: new Date('2026-09-21T15:00:00.000Z'),
      },
      {
        user: strengthAthlete._id,
        type: 'cycling',
        durationMinutes: 35,
        distanceKm: 8,
        calories: 240,
        completedAt: new Date('2026-09-23T15:00:00.000Z'),
      },
    ];
    await Promise.all(
      activities.map((activity) =>
        Activity.findOneAndUpdate(
          { user: activity.user, type: activity.type, completedAt: activity.completedAt },
          { $set: activity },
          { upsert: true, new: true, runValidators: true },
        ).exec(),
      ),
    );

    const leaderboardEntries = [
      { participantType: 'user', participantId: runner._id, displayName: runner.displayName, points: 85 },
      {
        participantType: 'user',
        participantId: strengthAthlete._id,
        displayName: strengthAthlete.displayName,
        points: 72,
      },
      { participantType: 'team', participantId: comets._id, displayName: comets.name, points: 140 },
      { participantType: 'team', participantId: tides._id, displayName: tides.name, points: 128 },
    ];
    await Promise.all(
      leaderboardEntries.map((entry) =>
        LeaderboardEntry.findOneAndUpdate(
          { participantType: entry.participantType, participantId: entry.participantId, period: 'all-time' },
          { $set: { ...entry, period: 'all-time' } },
          { upsert: true, new: true, runValidators: true },
        ).exec(),
      ),
    );

    await Promise.all(
      seedWorkouts.map((workout) =>
        Workout.findOneAndUpdate({ name: workout.name }, { $set: workout }, { upsert: true, new: true }).exec(),
      ),
    );

    console.log(
      `Database seeding complete: ${seedUsers.length} users, 2 teams, ${activities.length} activities, ` +
        `${leaderboardEntries.length} leaderboard entries, ${seedWorkouts.length} workouts.`,
    );
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
