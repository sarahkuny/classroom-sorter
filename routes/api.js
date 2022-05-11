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

const sendAllStudentsJoined = (req, res) => {
    db(`SELECT students.first_name, students.last_name, students.group_id, behaviors.student_id, behaviors.has_goal_one, behaviors.has_goal_two, behaviors.has_goal_three FROM students INNER JOIN behaviors ON students.id = behaviors.student_id;`)
        .then(results => {
            res.send(results.data);
        })
        .catch(err => res.status(500).send(err))
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Welcome to the API");
});
//get all students from student table
router.get('/students', (req, res) => {
    sendAllStudents(req, res)
})
//delete student by id from students and behaviors table
router.delete('/students/:id', (req,res) => {
  db(`DELETE from behaviors WHERE student_id = ${req.params.id};`)
    .then(() => {
      db(`DELETE FROM students WHERE id = ${req.params.id}`)
        .then(() => {
          sendAllStudentsJoined(req, res)
        })
    })
    .catch((error) => {
      res.status(500).send(error)
    })
});
//get students data from 
router.get('/students/joined', (req, res) => {
  sendAllStudentsJoined(req, res)
})

//add student to students and behaviors table, return join table
router.post ('/students', (req, res) => {
    db(`INSERT INTO students (first_name, last_name) VALUES ("${req.body.first_name}", "${req.body.last_name}");`)
      .then(() => {
        db(`SELECT id FROM students WHERE last_name="${req.body.last_name}" AND first_name="${req.body.first_name}"`)
          .then((results) => {
            db(`INSERT INTO behaviors (has_goal_one, has_goal_two, has_goal_three, student_id) SELECT ${req.body.has_goal_one}, ${req.body.has_goal_two}, ${req.body.has_goal_three}, ${results.data[0].id} FROM students WHERE last_name="${req.body.last_name}" AND first_name="${req.body.first_name}";`)
              .then(() => {
                db(`SELECT students.first_name, students.last_name, behaviors.has_goal_one, behaviors.has_goal_two, behaviors.has_goal_three FROM students INNER JOIN behaviors ON students.id = behaviors.student_id;`)
                  .then((results) => {
                    res.send(results.data)
                  })
              })
          })
      })
      .catch((error) => {
        res.status(500).send(error)
      })
    });
    
    
    
    
  
module.exports = router;