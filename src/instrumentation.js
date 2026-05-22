/**
 * Runs once when Next.js server starts — set DNS before any MongoDB SRV lookup.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const dns = await import("node:dns");
    dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
  }
}
