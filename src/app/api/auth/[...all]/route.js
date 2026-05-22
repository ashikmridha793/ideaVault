import { getAuth } from "@/lib/auth";
import { ensureMongoConnected } from "@/lib/mongodb";
import { toNextJsHandler } from "better-auth/next-js";

export const runtime = "nodejs";

let handlersPromise = null;

async function getHandlers() {
  if (!handlersPromise) {
    const auth = await getAuth();
    handlersPromise = Promise.resolve(toNextJsHandler(auth));
  }
  return handlersPromise;
}

export async function GET(request) {
  try {
    await ensureMongoConnected();
    const { GET: handler } = await getHandlers();
    return handler(request);
  } catch (err) {
    console.error("[auth GET]", err);
    return Response.json(
      { error: "Database connection failed", message: err.message },
      { status: 503 }
    );
  }
}

export async function POST(request) {
  try {
    await ensureMongoConnected();
    const { POST: handler } = await getHandlers();
    return handler(request);
  } catch (err) {
    console.error("[auth POST]", err);
    return Response.json(
      { error: "Database connection failed", message: err.message },
      { status: 503 }
    );
  }
}
