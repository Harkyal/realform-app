const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const mysql = require('mysql')

const app = express();
app.use(cors());
// parse application/json
app.use(bodyParser.json());

//create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydb'
});

//connect to database
conn.connect((err) => {
  if (err) throw err;
  console.log('Mysql Connected...');
});

//add new user
app.post('/store-data', (req, res) => {
  let data = { name: req.body.name };
  console.log({ name: req.body.name });
  let sql = "INSERT INTO users SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
  });
});

app.listen(3002, () => {
  console.log("Server running successfully on 3002");
});