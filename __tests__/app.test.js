const request = require("supertest");
const seedDb = require("../db/setup/seed-db");
const db = require("../db/connection");

beforeEach(async () => {
  await seedDb();
});

afterAll(() => db.end());
