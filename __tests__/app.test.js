const request = require("supertest");
const app = require("../app");
const seedDb = require("../db/setup/seed-db");
const db = require("../db/connection");

let token = "";

beforeAll(async () => {
  await seedDb();
  const postBody = {
    email: "test@lprice.dev",
    password: "isS1ANZ*#ESaRVIUgdnC9!$*",
  };

  const { body } = await request(app).post("/auth/login").send(postBody);

  token = body.accessToken;
});

beforeEach(async () => {
  await seedDb();
});

afterAll(() => db.end());

describe("/status", () => {
  describe("GET", () => {
    test("200 - returns an object with the key of online", async () => {
      const { status, body } = await request(app)
        .get("/status")
        .set({ Authorization: `Bearer ${token}` });
      expect(status).toBe(200);
      expect(body).toEqual({ msg: "online" });
    });
  });
});
