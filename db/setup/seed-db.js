const db = require("../connection");

const setupTables = async () => {
  await db.query(`CREATE TABLE users(
        user_id SERIAL PRIMARY KEY,
        email VARCHAR(256) NOT NULL,
        password VARCHAR NOT NULL
        );`);
};

const seedDb = async () => {
  await setupTables();
  console.log("db Seeded!");
};

module.exports = seedDb;
