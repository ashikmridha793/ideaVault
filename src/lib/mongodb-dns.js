import dns from "node:dns";

// Must run before any MongoDB SRV lookup (Windows often fails without this)
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
