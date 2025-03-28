test("GET to /api/v1/status should return 200", async () => {
  /*const response = fetch("/api/v1/status").then((response) => {
    expect(response.status).toBe(200);
  });*/

  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
});
