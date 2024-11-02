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