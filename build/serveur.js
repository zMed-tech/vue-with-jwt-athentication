const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mysql = require("mysql");
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const db = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "password",
  database: "database",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  db.query(
    "insert into users (username, email, password) values ('" +
      username +
      "', '" +
      email +
      "', '" +
      password +
      "')",
    (err) => {
      if (err) {
        res.send("err");
      } else {
        res.send(
          jwt.sign(
            {
              username,
              password,
            },
            process.env.TOKEN
          )
        );
      }
    }
  );
});

app.post("/signin", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "select * from users where username = '" +
      username +
      "' and password='" +
      password +
      "'",
    (err, result) => {
      if (err) {
        res.send("err");
      } else if (result[0] == undefined) {
        res.send("err");
      } else {
        const acessToken = jwt.sign(
          {
            username,
            password,
          },
          process.env.TOKEN
        );

        res.send(acessToken);
      }
    }
  );
});

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN, (err, user) => {
      if (err) {
        res.send("err");
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.send("err");
  }
};

app.get("/user", authenticateJWT, (req, res) => {
  res.send(req.user);
});

app.listen(port, () => {
  console.log(`running on : http://localhost:${port}`);
});
