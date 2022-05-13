require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "sorter",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  //create students table
  let sqlStudents = "DROP TABLE if exists students; CREATE TABLE students(id INT NOT NULL AUTO_INCREMENT, first_name VARCHAR(255) not null, last_name VARCHAR(255), group_id INT, PRIMARY KEY (id));";
  con.query(sqlStudents, function (err, result) {
    if (err) throw err;
    console.log("Table creation `students` was successful!");

  });
<<<<<<< HEAD
  //create behaviors table
  let sqlBehaviors = "DROP TABLE if exists behaviors; CREATE TABLE behaviors(id INT NOT NULL AUTO_INCREMENT, student_id INT, has_goal_one BOOLEAN not null, has_goal_two BOOLEAN not null, has_goal_three BOOLEAN not null, PRIMARY KEY (id), FOREIGN KEY (student_id) REFERENCES students(id));";
  con.query(sqlBehaviors, function (err, result) {
    if (err) throw err;
    console.log("Table creation `behaviors` was successful!");
||||||| ba0a0fb
=======
  //create behaviors table
  let sqlBehaviors = "DROP TABLE if exists behaviors; CREATE TABLE behaviors(id INT NOT NULL AUTO_INCREMENT, student_id INT, has_goal_one BOOLEAN not null, has_goal_two BOOLEAN not null, has_goal_three BOOLEAN not null, score INT, PRIMARY KEY (id), FOREIGN KEY (student_id) REFERENCES students(id));";
  con.query(sqlBehaviors, function (err, result) {
    if (err) throw err;
    console.log("Table creation `behaviors` was successful!");
>>>>>>> bb26b8a99e6ce2aa0ad166f3437c2b7797e4d20e

    console.log("Closing...");
  });
  con.end();
});

