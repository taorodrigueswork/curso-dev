// Importing the 'pg' library to interact with a PostgreSQL database
import { Client } from "pg"; // to install this library, run the command: npm install pg
// to run the database docker compose -f infra/compose.yaml up -d in a bash terminal

// Asynchronous function to execute a database query
async function query(queryObject) {
  // Creating a new PostgreSQL client instance with connection details
  const client = new Client({
    user: process.env.POSTGRES_USER, // Database username
    host: process.env.POSTGRES_HOST, // Host where the database is running
    port: process.env.POSTGRES_PORT, // Default PostgreSQL port
    database: process.env.POSTGRES_DB, // Name of the database to connect to
    password: process.env.POSTGRES_PASSWORD, // Password for the database user
    ssl: getSSLValues(), // SSL configuration for secure connection
  });

  try {
    // Connecting to the database
    await client.connect();

    // Executing the query passed as an argument and storing the result
    const result = await client.query(queryObject);

    // Logging the result of the query to the console
    //console.log("Result of Query:", result);

    // Returning the query result to the caller
    return result;
  } catch (error) {
    // Logging any errors that occur during the query execution
    console.error("Error executing query:", error);
    throw error; // Rethrowing the error to be handled by the caller
  } finally {
    // Closing the database connection
    await client.end();
  }
}

// Exporting the query function as part of the default export object
export default {
  query: query,
};

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }
  return process.env.NODE_ENV === "production" ? true : false;
}
