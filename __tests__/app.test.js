const request = require("supertest");
const app = require("../app");
const seedDb = require("../db/setup/seed-db");
const db = require("../db/connection");

beforeEach(async () => {
  await seedDb();
});

afterAll(() => db.end());

describe("/status", () => {
  describe("GET", () => {
    test("200 - returns an object with the key of online", async () => {
      const { status, body } = await request(app).get("/status");
      expect(status).toBe(200);
      expect(body).toEqual({ msg: "online" });
    });
  });
});
