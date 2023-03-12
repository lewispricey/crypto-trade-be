const jwt = require("jsonwebtoken");

const ENV = process.env.NODE_ENV || "dev";
const pathToCorrectEnvFile = `${__dirname}/../.env.${ENV}`;

require("dotenv").config({
  path: pathToCorrectEnvFile,
});

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return next({ code: 401, msg: "Unauthorized" });
  }

  const publicKey = Buffer.from(process.env.PUBLIC_KEY, "base64").toString(
    "ascii"
  );

  jwt.verify(
    token,
    publicKey,
    {
      algorithms: ["RS256"],
    },
    (err, decodedToken) => {
      console.log(decodedToken, err);

      if (err) {
        return res.status(401).send({ code: 401, msg: "Unauthorized" });
      } else {
        req.user_id = decodedToken.user_id;
        next();
      }
    }
  );
};

module.exports = authenticateToken;
