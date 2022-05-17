
import React, { useEffect, useState } from 'react'
import {Button, Form, FormControl, FormGroup, ToggleButton} from 'react-bootstrap'

export default function RosterView() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [hasGoalOne, setHasGoalOne] = useState(false);
  const [hasGoalTwo, setHasGoalTwo] = useState(false);
  const [hasGoalThree, setHasGoalThree] = useState(false);
  const [student, setStudent] = useState({});
  const [students, setStudents] = useState([]);
  
  useEffect(() => {
    getStudents()
  }, []);

  const getStudents = () => {
    fetch("/api/students/joined")
      .then(response => response.json())
      .then(students => {
        setStudents(students);
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  


  const handleFirstNameChange = (event) => {
    
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => { 
    setLastName(event.target.value);
  }

  const handleCheckOne = (event) => {
      setHasGoalOne(event.target.checked)
  }

  const handleCheckTwo = (event) => {
      setHasGoalTwo(event.target.checked)
  }

  const handleCheckThree = (e) => {
      setHasGoalThree(e.target.checked)
      console.log(hasGoalThree)
  }


  const addStudent = () => {
    fetch("/api/students", {
          method:"POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            first_name: `${firstName}`,
            last_name: `${lastName}`,
            has_goal_one: hasGoalOne,
            has_goal_two: hasGoalTwo,
            has_goal_three: hasGoalThree
          })
        })
        .then(response => response.json()
        )
          .then((data) => {
            setStudents(data);
          })
            .catch((error) => {
              console.log(error)
                })
    
  }
  

  const handleAddStudent = (e) => {
    e.preventDefault();
    setStudent(
        {firstName: firstName,
        lastName: lastName,
        hasGoalOne: hasGoalOne,
        hasGoalTwo: hasGoalTwo,
        hasGoalThree: hasGoalThree}
    ) 
    addStudent();
    setFirstName("");
    setLastName("");
    setHasGoalOne(false);
    setHasGoalTwo(false);
    setHasGoalThree(false)
  }


  //const handleDelete = (e) => {}


    return (
      <>
    <div className="roster-view">
      {/* Display Roster */}
      <div className="roster">
        <h2>Students</h2>
        <div className="student-roster">
          <h5>Name</h5>
          <h5>Goals</h5>
        </div>
        {students.map(student => (
          <div key={student.id} className="student-roster">
              <p>
                {student.first_name} {student.last_name}
              </p>
              {student.has_goal_one  ? <p>Goal One</p> : ""}
              {student.has_goal_two ? <p>Goal Two</p> : ""}
              {student.has_goal_three ? <p>Goal Three</p> : ""}
              <button className="btn-delete">Delete</button>
          </div>))}
      </div>

      {/* Add Student Form */}
      <div className="student-form">
        <h5>Add Student</h5>
        <form onSubmit={handleAddStudent}>
          <div className="name-input">
            <label>First Name</label>
            <input type="text" onChange={handleFirstNameChange} value={firstName}></input>
          </div>
          <div className="name-input">
            <label>Last Name</label>
            <input type="text" onChange={handleLastNameChange} value={lastName}></input>
          </div>
          <div className="form-checks">
            <FormGroup>
              <Form.Check type="checkbox" label="I can make good choices even if I am mad." checked={hasGoalOne} onChange={handleCheckOne}/>
              <Form.Check type="checkbox" label="I can be okay even if others are not okay." checked={hasGoalTwo} onChange={handleCheckTwo}/>
              <Form.Check type="checkbox" label="I can do something even if I don't want to (or it's hard)." checked={hasGoalThree} onChange={handleCheckThree}/>
            </FormGroup>
            <button type="submit">Add Student</button>
          </div>
        </form>
      </div>          
    </div>
    {/* Create Groups */}
    <div className="create-groups">
      <div className="create-groups-input">
        <label>How many groups would you like to create?</label>
        <input type="number" min="1"></input>
      </div>
      <button type="submit">Create Groups</button>
    </div>
    </>
  )
}
