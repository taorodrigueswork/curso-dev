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
  const activeConnectionsResult = await database.query(
    "SELECT COUNT(*) AS active_connections FROM pg_stat_activity;",
  );
  const activeConnections = activeConnectionsResult.rows[0].active_connections;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: postgresVersion, // Include PostgreSQL version in the response
        max_connections: maxConnections, // Include max connections in the response
        active_connections: activeConnections, // Include active connections in the response. If I send a wrong query, one new database connection will be opened.
      },
    },
  });
}

export default status;
