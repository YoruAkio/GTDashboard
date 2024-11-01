import { Webhook } from '@clerk/clerk-sdk-node';
import mongoose from 'mongoose';

// Connect to MongoDB
const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// Define a User schema
const userSchema = new mongoose.Schema({
  clerkId: String,
  email: String,
  username: String,
  createdAt: Date,
  updatedAt: Date,
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
  const event = webhook.verify(req.body, req.headers['clerk-signature']);

  if (event.type === 'user.created' || event.type === 'user.updated') {
    const user = event.data;
    await connectToDatabase();
    await User.findOneAndUpdate(
      { clerkId: user.id },
      {
        clerkId: user.id,
        email: user.email_addresses[0].email_address,
        username: user.username,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
      },
      { upsert: true }
    );
  }

  res.status(200).send('Webhook received');
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};