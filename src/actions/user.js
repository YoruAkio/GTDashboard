"use server";

import User from "@/models/User"
import { connectToDatabase } from "@/lib/mongodb";

export async function createUser(data) {
    try {
        await connectToDatabase();
        const user = new User(data);
        await user.save();
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function updateUser(id, data) {
    try {
        const clerkId = {
            clerkId: id
        }
        await connectToDatabase();
        const user = await User.findOne(clerkId);
        if (user) {
            user.email = data.email;
            user.username = data.username;
            user.photo = data.photo;
            user.createdAt = data.createdAt;
            user.roles = 4;
            await user.save();
            return JSON.parse(JSON.stringify(user));
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function getUserRole(id) {
    try {
        await connectToDatabase();
        const user = await User.findOne({ clerkId: id });
        return user.roles;
    } catch (error) {
        console.error("Error fetching user roles:", error);
        return error;
    }
}