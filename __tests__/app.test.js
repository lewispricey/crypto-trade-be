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

describe("/register", () => {
  describe("POST", () => {
    test("201 - returns the new user profile", async () => {
      const postBody = {
        email: "testemail@email.com",
        password: "P4ssW0RD!",
      };

      const { status, body } = await request(app)
        .post("/register")
        .send(postBody);

      expect(status).toBe(201);
      expect(body.user).toEqual({
        fiat_balance: "10000.00",
        profile_id: expect.any(Number),
        user_id: expect.any(Number),
      });
    });

    test("400 - returns an error when the request is missing a email", async () => {
      const postBody = {
        password: "P4ssW0RD!",
      };

      const { status, body } = await request(app)
        .post("/register")
        .send(postBody);

      expect(status).toBe(400);
      expect(body).toEqual({ msg: "invalid email" });
    });

    test("400 - returns an error when the request is missing a password", async () => {
      const postBody = {
        email: "testemail@email.com",
      };

      const { status, body } = await request(app)
        .post("/register")
        .send(postBody);

      expect(status).toBe(400);
      expect(body).toEqual({
        msg: "password does not meet requirements",
      });
    });

    test("400 - returns an error when passed an invalid email", async () => {
      const postBody = {
        email: "notanemail.com",
        password: "P4ssW0RD!",
      };

      const { status, body } = await request(app)
        .post("/register")
        .send(postBody);

      expect(status).toBe(400);
      expect(body).toEqual({ msg: "invalid email" });
    });

    test("400 - returns an error when passed a password that does not meet requirements", async () => {
      const postBody = {
        email: "testemail@email.com",
        password: "password1",
      };

      const { status, body } = await request(app)
        .post("/register")
        .send(postBody);

      expect(status).toBe(400);
      expect(body).toEqual({
        msg: "password does not meet requirements",
      });
    });

    test("400 - returns an error when trying to reuse an email in the DB", async () => {
      const postBody = {
        email: "testemail@email.com",
        password: "P4ssW0RD!",
      };

      const response1 = await request(app).post("/register").send(postBody);
      expect(response1.status).toBe(201);

      const { status, body } = await request(app)
        .post("/register")
        .send(postBody);

      expect(status).toBe(400);
      expect(body).toEqual({
        msg: "account creation failed",
      });
    });
  });
});

describe("/login", () => {
  describe("POST", () => {
    test("200 - returns a JWT access token upon successful login", async () => {
      const postBody = {
        email: "test@lprice.dev",
        password: "isS1ANZ*#ESaRVIUgdnC9!$*",
      };

      const { header, status, body } = await request(app)
        .post("/login")
        .send(postBody);

      expect(status).toBe(200);
      expect(body).toEqual({ accessToken: expect.any(String) });
      expect(body.accessToken.length).toBe(105);
    });

    test("400 - returns an error when email is missing", async () => {
      const postBody = {
        password: "isS1ANZ*#ESaRVIUgdnC9!$*",
      };

      const { status, body } = await request(app).post("/login").send(postBody);

      expect(status).toBe(400);
      expect(body).toEqual({ msg: "invalid email or password" });
    });

    test("400 - returns an error when password is missing", async () => {
      const postBody = {
        email: "notRegistered@lprice.dev",
      };

      const { status, body } = await request(app).post("/login").send(postBody);

      expect(status).toBe(400);
      expect(body).toEqual({ msg: "invalid email or password" });
    });

    test("400 - returns an error if email isn't registered", async () => {
      const postBody = {
        email: "notRegistered@lprice.dev",
        password: "isS1ANZ*#ESaRVIUgdnC9!$*",
      };

      const { status, body } = await request(app).post("/login").send(postBody);

      expect(status).toBe(400);
      expect(body).toEqual({ msg: "invalid email or password" });
    });

    test("400 - returns an error if the password does not compute to the saved hash", async () => {
      const postBody = {
        email: "test@lprice.dev",
        password: "P4ssW0RD!",
      };

      const { status, body } = await request(app).post("/login").send(postBody);

      expect(status).toBe(400);
      expect(body).toEqual({ msg: "invalid email or password" });
    });
  });
});
