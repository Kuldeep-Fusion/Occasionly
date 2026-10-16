import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// In-memory fallback storage when MongoDB URI is not configured
let inMemoryStore = global.__inMemoryDb;
if (!inMemoryStore) {
  inMemoryStore = global.__inMemoryDb = {
    rsvps: [
      {
        _id: 'mock-1',
        name: 'Maria Rossi',
        attending: 'attending',
        guestsCount: 1,
        dietary: ['Vegetarian'],
        dietaryNotes: 'No nuts please',
        songRequest: 'Can\'t Help Falling in Love - Elvis Presley',
        message: 'So incredibly happy for both of you! Can’t wait to celebrate your special day! ❤️',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
      }
    ],
    wishes: [
      {
        _id: 'wish-1',
        name: 'Sophia & Lucas',
        message: 'Wishing you a lifetime of love, laughter, and endless adventures together! Congratulations Gregory & Anna! 🥂✨',
        emoji: '🥂',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString()
      },
      {
        _id: 'wish-2',
        name: 'Uncle Robert',
        message: 'May your union bring you immense joy and warmth. Sending you all my blessings from afar.',
        emoji: '❤️',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString()
      }
    ]
  };
}

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    return { isConnected: false, fallback: inMemoryStore };
  }

  if (cached.conn) {
    return { isConnected: true, conn: cached.conn, fallback: inMemoryStore };
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    }).catch((err) => {
      console.warn('⚠️ MongoDB connection attempt failed, using fallback in-memory store:', err.message);
      cached.promise = null;
      return null;
    });
  }

  try {
    cached.conn = await cached.promise;
    if (cached.conn) {
      return { isConnected: true, conn: cached.conn, fallback: inMemoryStore };
    }
  } catch (e) {
    cached.promise = null;
  }

  return { isConnected: false, fallback: inMemoryStore };
}

export { inMemoryStore };
