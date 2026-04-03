// ? only reason i made it api/users/webhook is because in the clerk app, its like that ?
// ? example that i got from the docs ?

// ugly code

import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

// my name, "Hrpavi" will put out null as surname cuz i literally dont have a surname
// everything else works fine i think

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "ERROR! Please add CLERK_SIGNING_SECRET from Clerk dashboard to .env or .env.local!",
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("ERROR! Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("ERROR! Could not verify webhook", err);

    return new Response("ERROR! Verification error", {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console

  // * MOVED DOWN CUZ ERRORS!
  // const data = evt.data // modified from { id } to data
  const eventType = evt.type

  // * for debug, can remove
  // console.log(`Received webhook with ID ${data.id} and event type of ${eventType}`,); // also here w data
  // console.log("Webhook payload:", body);

  if (eventType === "user.created") {
    // ! OLD VER deprecated
    // const data = evt.data
    // ? NEW VER use this 
    const { data } = evt
    // if in the future i will try to get email
    // const name = !data.firstName ? data.email_addresses[0].email_address

    await db.insert(users).values({
      clerkId: data.id,
      name: `${data.first_name} ${data.last_name}`, // if email, "null" "null"
      imageUrl: data.image_url,
    });
  }

  if (eventType === "user.deleted") {
    const { data } = evt;

    // * very rare, because we store the clerkId in our db
    if (!data.id) {
        return new Response("ERROR! Missing user ID", { status: 400 });
    }

    // idk if actually works
    await db.delete(users).where(eq(users.clerkId, data.id));
  }

  if (eventType === "user.updated") {
    const { data } = evt;

    await db
        .update(users)
        .set({
            name: `${data.first_name} ${data.last_name}`,
            imageUrl: data.image_url,
        })
        .where(eq(users.clerkId, data.id));
  }

  // * if the response is ok, then proceed
  return new Response("Webhook received", { status: 200 });
}
