import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  if (request.method === "GET") {
    const migrations = await migrationRunner({
      dir: join("infra", "migrations"),
      databaseUrl: process.env.DATABASE_URL,
      direction: "up",
      dryRun: true,
      verbose: true,
      migrationsTable: "pgmigrations",
    });
    return response.status(200).json(migrations);
  }

  if (request.method === "POST") {
    const migrations = await migrationRunner({
      dir: join("infra", "migrations"),
      databaseUrl: process.env.DATABASE_URL,
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    });
    return response.status(200).json(migrations);
  }
  return response.status(405).end();
}
