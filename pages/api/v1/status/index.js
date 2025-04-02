/**
 * @swagger
 * /example:
 *   get:
 *     summary: Example endpoint
 *     description: Returns a simple message.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hello, world!"
 */

import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString(); //ISO 8601 format

  // Query the PostgreSQL version
  const versionResult = await database.query("SHOW server_version;");
  const postgresVersion = versionResult.rows[0].server_version;

  // Query the maximum number of connections
  const maxConnectionsResult = await database.query("SHOW max_connections;");
  const maxConnections = maxConnectionsResult.rows[0].max_connections;

  // Query the number of active connections
  const databaseName = process.env.POSTGRES_DB;

  const activeConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const databaseOpenedConnectionsValue = activeConnections.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: postgresVersion, // Include PostgreSQL version in the response
        max_connections: parseInt(maxConnections), // Include max connections in the response
        opened_connections: databaseOpenedConnectionsValue, // Include active connections in the response. If I send a wrong query, one new database connection will be opened.
      },
    },
  });
}

export default status;
