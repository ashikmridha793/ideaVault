import "./mongodb-dns.js";
import { MongoClient } from "mongodb";

const globalForMongo = globalThis;

function getUri() {
  return process.env.MONGODB_URI_STANDARD || process.env.MONGODB_URI;
}

export async function getMongoClient() {
  if (!globalForMongo._ideavaultMongoClient) {
    const uri = getUri();
    if (!uri) {
      throw new Error("MONGODB_URI is not set in .env");
    }

    globalForMongo._ideavaultMongoClient = new MongoClient(uri, {
      serverSelectionTimeoutMS: 20000,
      connectTimeoutMS: 20000,
    });

    globalForMongo._ideavaultMongoConnectPromise = globalForMongo._ideavaultMongoClient
      .connect()
      .then(() => {
        globalForMongo._ideavaultMongoConnected = true;
      })
      .catch((err) => {
        globalForMongo._ideavaultMongoClient = null;
        globalForMongo._ideavaultMongoConnectPromise = null;
        throw err;
      });
  }

  await globalForMongo._ideavaultMongoConnectPromise;
  return globalForMongo._ideavaultMongoClient;
}

export async function ensureMongoConnected() {
  return getMongoClient();
}

export async function getDb() {
  const client = await getMongoClient();
  return client.db("ideaVault");
}
