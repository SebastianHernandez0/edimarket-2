const request = require("supertest");
const server = require("../src/app");

describe("Testing server", () => {
  it("should return 200 for /", async () => {
    const response = await request(server).get("/usuarios ");
    const status = response.status;
    expect(status).toBe(200);
  });
});