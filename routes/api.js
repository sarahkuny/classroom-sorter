var express = require("express");
var router = express.Router();
const db = require("../model/helper");

//helper functions
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
};


//GET METHODS
// GET home page
router.get('/', function(req, res, next) {
  res.send("Welcome to the API");
});

//GET all students from student table
router.get('/students', (req, res) => {
  sendAllStudents(req, res)
});

router.get('/behaviors', (req, res) => {
  db(`SELECT * FROM behaviors`)
    .then((results) => {
      res.send(results.data)
    })
})

//GET students/behavior join table
router.get('/students/joined', (req, res) => {
  sendAllStudentsJoined(req, res)
});



//POST METHODS
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
  

//PUT Methods
//create later? Use in sorting algorithm?

//DELETE Methods
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

//SORTING ALGORITHM
router.get('/students/sort/:groups', (req, res) => {
  let groupNo = req.params.groups;

  db(`SELECT * FROM behaviors;`)
    .then()
})

//get request for behaviors
//filter array for no-behaviors
//filter array for behaviors. first students should have score of 3, then 2, then 1
//create array for each group (2 if group # is 2)
//loop through behavior array and add group_id (or add to array for each group, then add group_id based on array)
//fill in rest of groups with non-behavior students
//put request edit group_id
//get request joined table (display which goals student has on the group view)

//so frontend receives a get response (/students/joined)

    
    
    
  
module.exports = router;