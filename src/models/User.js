import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    roles: {
        type: Number,
        required: true,
        default: 0,
    }
});

export default models?.User || model('User', userSchema);