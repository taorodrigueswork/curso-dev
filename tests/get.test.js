test("GET to /api/v1/status should return 200 and include database info", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody);

  // Check if updated_at exists and is in ISO format
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toBeDefined(); //check if variable exists
  expect(responseBody.updated_at).toBe(parsedUpdatedAt);

  // Check if postgres_version exists and is a string
  expect(responseBody.dependencies.database.version).toBeDefined();
  expect(responseBody.dependencies.database.version).toBe("16.0");

  // Check if max_connections exists and is a number
  expect(responseBody.dependencies.database.max_connections).toBeDefined();
  expect(
    Number.isInteger(
      Number(responseBody.dependencies.database.max_connections),
    ),
  ).toBe(true);

  // Check if active_connections exists and is a number
  expect(responseBody.dependencies.database.active_connections).toBeDefined();
  expect(
    Number.isInteger(
      Number(responseBody.dependencies.database.active_connections),
    ),
  ).toBe(true);
});
