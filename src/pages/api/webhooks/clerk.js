import { clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { createUser } from "@/actions/user";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

        if (!WEBHOOK_SECRET) {
            return NextResponse.error("Please define the WEBHOOK_SECRET environment variable");
        }

        const pHeader = headers();
        const svixId = pHeader.get("svix-id");
        const svixSignature = pHeader.get("svix-signature");
        const svixTimestamp = pHeader.get("svix-timestamp");

        if (!svixId || !svixSignature || !svixTimestamp) {
            return NextResponse.error("Missing svix headers");
        }
        
        const payload = await req.json();
        const body = JSON.stringify(payload);
        const wh = new Webhook(WEBHOOK_SECRET);
        let ev;

        try {
            ev = wh.verify(body, {
                'svix-id': svixId,
                'svix-signature': svixSignature,
                'svix-timestamp': svixTimestamp,
            });
        } catch (e) {
            console.error(`Failed to verify webhook: ${e}`);
            return NextResponse.error("Failed to verify webhook");
        }

        const { id } = ev;
        const evType = ev.type;

        if (evType === "user.created") {
            const { id, email_addresses, username, image_url, created_at } = payload;

            const uData = {
                clerkId: id,
                email: email_addresses[0].email_address,
                username: username,
                image: image_url,
                createdAt: created_at
            };

            console.log(uData);

            const nUser = await createUser(uData);

            if (nUser) {
                await clerkClient.users.updateUserMetadata(id, {
                    publicMetadata: {
                        userId: nUser._id,
                    },
                });
            }

            console.log(`Created user with id ${id}`);
            return NextResponse.json({ message: "User created", user: nUser });
        }

        console.log(`Received webhook with id ${id} and type ${evType}`);
        console.log(`Payload: ${body}`);

        return NextResponse.json({ status: "ok" });
    }
}