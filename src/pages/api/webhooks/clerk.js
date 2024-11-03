import { Webhook } from 'svix';
import { buffer } from 'micro';
import { createUser, updateUser } from '@/actions/user';
import { clerkClient } from '@clerk/clerk-sdk-node';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  const svix_id = req.headers['svix-id'];
  const svix_timestamp = req.headers['svix-timestamp'];
  const svix_signature = req.headers['svix-signature'];

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ error: 'Error occurred -- no svix headers' });
  }

  console.log('headers', req.headers, svix_id, svix_signature, svix_timestamp);

  const body = (await buffer(req)).toString();

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return res.status(400).json({ Error: err });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, email_addresses, first_name, image_url, created_at, roles } = evt.data;

    const uData = {
      clerkId: id,
      email: email_addresses[0].email_address,
      username: first_name,
      photo: image_url,
      createdAt: created_at,
      roles: roles,
    };

    console.log(uData);

    let nUser;
    if (eventType === "user.created") {
      nUser = await createUser(uData);
    } else if (eventType === "user.updated") {
      nUser = await updateUser(id, uData);
    }

    if (nUser) {
      await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: nUser._id,
        },
      });
    }

    console.log(`${eventType === "user.created" ? "Created" : "Updated"} user with id ${id}`);
    return res.status(200).json({ message: `${eventType === "user.created" ? "User created" : "User updated"}`, user: nUser });
  }

  console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
  console.log('Webhook body:', body);

  return res.status(200).json({ response: 'Success' });
}