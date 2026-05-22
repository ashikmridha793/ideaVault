import "./mongodb-dns.js";
import { MongoClient } from "mongodb";

const globalForMongo = globalThis;

function getUri() {
  // Use standard (non-SRV) URI from Atlas if SRV DNS fails on your network
  return process.env.MONGODB_URI_STANDARD || process.env.MONGODB_URI;
}

export function getMongoClient() {
  if (!globalForMongo._ideavaultMongoClient) {
    globalForMongo._ideavaultMongoClient = new MongoClient(getUri(), {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
    });
  }
  return globalForMongo._ideavaultMongoClient;
}

export async function getDb() {
  const client = getMongoClient();
  if (!globalForMongo._ideavaultMongoConnected) {
    await client.connect();
    globalForMongo._ideavaultMongoConnected = true;
  }
  return client.db("ideaVault");
}
