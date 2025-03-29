// Importing the 'pg' library to interact with a PostgreSQL database
import { Client } from "pg"; // to install this library, run the command: npm install pg
// to run the database docker compose -f infra/compose.yaml up -d in a bash terminal

// Asynchronous function to execute a database query
async function query(queryObject) {
  // Creating a new PostgreSQL client instance with connection details
  const client = new Client({
    user: "postgres", // Database username
    host: "localhost", // Host where the database is running
    port: 5432, // Default PostgreSQL port
    database: "postgres", // Name of the database to connect to
    password: "local_password", // Password for the database user
  });

  // Connecting to the database
  await client.connect();

  // Executing the query passed as an argument and storing the result
  const result = await client.query(queryObject);

  // Logging the result of the query to the console
  console.log("Result of Query:", result);

  // Closing the database connection
  await client.end();

  // Returning the query result to the caller
  return result;
}

// Exporting the query function as part of the default export object
export default {
  query: query,
};
