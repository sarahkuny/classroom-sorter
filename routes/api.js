var express = require("express");
var router = express.Router();
const db = require("../model/helper");

const sendAllStudents = (req, res) => {
    db("SELECT * FROM students ORDER BY id ASC;")
      .then(results => {
        res.send(results.data);
      })
      .catch(err => res.status(500).send(err));
  };

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Welcome to the API");
});

router.get('/students', (req, res) => {
    sendAllStudents(req, res)
})

router.post('/students', (req, res) => {
    db(`INSERT INTO students (first_name, last_name) VALUES ("${req.body.first_name}", "${req.body.last_name}");`)
    .then(() => {
        sendAllStudents(req, res);
    })
    .catch(err => res.status(500).send(err))
})

module.exports = router;