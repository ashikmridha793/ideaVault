import "./mongodb-dns.js";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { getMongoClient, ensureMongoConnected } from "./mongodb";

const baseURL = process.env.BETTER_AUTH_URL || "http://localhost:3000";

let authPromise = null;

async function createAuth() {
  const client = await getMongoClient();
  await ensureMongoConnected();
  const db = client.db("ideaVault");

  return betterAuth({
    baseURL,
    secret: process.env.BETTER_AUTH_SECRET,
    trustedOrigins: [baseURL, "http://localhost:3000"],
    database: mongodbAdapter(db, { client }),
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
    },
    plugins: [nextCookies()],
  });
}

export function getAuth() {
  if (!authPromise) {
    authPromise = createAuth();
  }
  return authPromise;
}
