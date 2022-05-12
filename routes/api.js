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
//Helper Functions


router.get('/students/sort/:groups', (req, res) => {
  let groupNo = req.params.groups;
  let scoreThreeStudents = [];
  let scoreTwoStudents = [];
  let scoreOneStudents = [];
  let noScoreStudents = [];
  let groupsObj={};

  //create number of groups (determined by the request)
  for (let i = 0; i < groupNo; i++){
    let key = i.toString();
    groupsObj[key] = [];
  };
  //score students and push to corresponding array
  db(`SELECT * FROM behaviors;`)
    .then((results) => {
      let behaviors = results.data;
      for (let i = 0; i < behaviors.length; i++){
        let curStudent = behaviors[i];
        //add weighted score to student object
        curStudent.score = curStudent.has_goal_one + curStudent.has_goal_two + curStudent.has_goal_three;
        //push student to corresponding array (based on score)
        if (curStudent.score === 3){
          scoreThreeStudents.push(curStudent)
        } else if (curStudent.score === 2){
          scoreTwoStudents.push(curStudent)
        } else if (curStudent.score === 1){
          scoreOneStudents.push(curStudent)
        } else {
          noScoreStudents.push(curStudent)
        }
      };
    })
    //distribute students into groups, starting with highest scored students first
      .then(() => {
        let count = 0;
        //distribute students with a score of three
        for (let i = 0; i < scoreThreeStudents.length; i++){
          let curStudent = scoreThreeStudents[i];
          if (count != groupNo){
            groupsObj[count].push(curStudent)
            count++;  
          } else {
            groupsObj[count].push(curStudent);
            count = 0;
          }
        };
        //distribute students with a score of two
        for (let i = 0; i < scoreTwoStudents.length; i++){
          let curStudent = scoreTwoStudents[i];
          if (count != groupNo){
            groupsObj[count].push(curStudent)
            count++;  
          } else {
            groupsObj[count].push(curStudent);
            count = 0;
          }
        };
        //distribute students with a score of one
        for (let i = 0; i < scoreOneStudents.length; i++){
          let curStudent = scoreOneStudents[i];
          if (count != groupNo){
            groupsObj[count].push(curStudent)
            count++;  
          } else {
            groupsObj[count].push(curStudent);
            count = 0;
          }
        };
        //distribute students with a score of zero
        for (let i = 0; i < noScoreStudents.length; i++){
          let curStudent = noScoreStudents[i];
          if (count != groupNo){
            groupsObj[count].push(curStudent)
            count++;  
          } else {
            groupsObj[count].push(curStudent);
            count = 0;
          }
        };
      })
        .then(() => {
          console.log(groupsObj)
        })
        .then(() => {
          //loop through groupsObj
          for (let group in groupsObj){
            //need key name to know what group id to assign
            for (let i = 0; i < groupsObj[group].length; i++){
              let curObj = groupsObj[group][i];
              let studentID = curObj.student_id;
              let groupID = group;
              db(`UPDATE students SET group_id=${groupID} where id=${studentID};`)
                .then(() => {
                  sendAllStudentsJoined(req, res);
                })
            }
          }
        })
  
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