const express = require("express");
const mysql = require("mysql");

const app = express();

//create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "secret",
  database: "nodemysql"
});

//connect to mysql
db.connect(err => {
  if (err) throw err;
  console.log("MySQL connected");
});

//create DB
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE nodemysql";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("databese created");
  });
});

//create a table
app.get("/create-post-table", (req, res) => {
  let sql =
    "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))";

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post table created");
  });
});

//inser post 1
app.get("/add", (req, res) => {
  let post = {
    title: "Post 1",
    body: "This is Post 1"
  };
  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post 1 added");
  });
});

app.get("/add2", (req, res) => {
  let post = {
    title: "Post 2",
    body: "Post 2 lorem Server started on port 3000 Server started on port 3000"
  };
  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post 2 added");
  });
});

//select posts
app.get("/posts", (req, res) => {
  let sql = "SELECT * FROM posts";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify(results));
  });
});

//select post
app.get("/post/:id", (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});

//update post
app.get("/update/:id", (req, res) => {
  let data = "Updated title";
  let sql = `UPDATE posts SET title = '${data}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});

//delete post
app.get("/delete/:id", (req, res) => {
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});

app.listen("3000", () => console.log("Server started on port 3000"));
