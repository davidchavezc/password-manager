const path = require("node:path");
const express = require('express')
const session = require('express-session')
const pg = require('pg')
const passport = require('passport')

const app = express()
const port = 3000
require('dotenv').config()

const LocalStrategy = require('passport-local').Strategy;

app.listen(port, () => {
  console.log(`Password manager app listening on port ${port}`)
});

const pool = new pg.Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "shh", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false}));

app.get('/', (req, res) => res.render("index"));
app.get('/sign-up', (req, res) => res.render("sign-up-form"));


app.post("/sign-up", async (req, res, next) => {
  try {
    await pool.query('INSERT INTO "users" (username, password) VALUES ($1, $2)', [
      req.body.username,
      req.body.password,
    ]);
    res.redirect("/");
  } catch(err) {
    return next(err);
  }
});
