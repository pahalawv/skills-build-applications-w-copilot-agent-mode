import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    displayName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
  },
  { timestamps: true },
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, trim: true, default: '' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['running', 'walking', 'strength', 'cycling', 'other'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0, default: 0 },
    calories: { type: Number, min: 0, default: 0 },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const leaderboardEntrySchema = new Schema(
  {
    participantType: { type: String, enum: ['user', 'team'], required: true },
    participantId: { type: Schema.Types.ObjectId, required: true },
    displayName: { type: String, required: true, trim: true },
    points: { type: Number, required: true, min: 0, default: 0 },
    period: { type: String, enum: ['weekly', 'monthly', 'all-time'], default: 'all-time' },
  },
  { timestamps: true },
);

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: '' },
    category: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    durationMinutes: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

export const User = mongoose.models.User ?? model('User', userSchema);
export const Team = mongoose.models.Team ?? model('Team', teamSchema);
export const Activity = mongoose.models.Activity ?? model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.models.LeaderboardEntry ?? model('LeaderboardEntry', leaderboardEntrySchema);
export const Workout = mongoose.models.Workout ?? model('Workout', workoutSchema);