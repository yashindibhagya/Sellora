import { app } from "./app";
import { env } from "./config/env";
import { prisma } from "./prismaClient";

const port = env.port;

async function start() {
  try {
    await prisma.$connect();
    app.listen(port, () => {
      console.log(`API listening on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
}

start();

