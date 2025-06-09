const express = require('express')
const pg = require('pg')
const app = express()
const port = 3000
require('dotenv').config()

app.get('/', (req, res) => {
  res.send('Hello World!')
});

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