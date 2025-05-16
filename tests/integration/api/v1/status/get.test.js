import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET to /api/v1/status should return 200 and include database info", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  //console.log(responseBody);

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString(); // Check if updated_at exists and is in ISO format
  expect(responseBody.updated_at).toBeDefined(); //check if variable exists
  expect(responseBody.updated_at).toBe(parsedUpdatedAt);

  // Check if postgres_version exists and is a string
  expect(responseBody.dependencies.database).toBeDefined();
  expect(responseBody.dependencies.database.version).toBe("16.0");
  expect(responseBody.dependencies.database.max_connections).toBe(100);
  expect(responseBody.dependencies.database.opened_connections).toBe(1);
});
