
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
  }, [students]);

  const getStudents = () => {
    fetch("/api/students")
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


  const addStudent = (e) => {
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
        .then((response) => {
                response.data.json()
              })
                .then((data) => {
                  setStudents(data)
                }).catch((error) => {
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
  }


  //const handleDelete = (e) => {}


    return (
    <div>
        <form onSubmit={handleAddStudent}>
            <div className="name-input">
                <label>First Name</label>
                <input type="text" onChange={handleFirstNameChange} value={firstName}></input>
            </div>
            <div className="name-input">
                <label>Last Name</label>
                <input type="text" onChange={handleLastNameChange} value={lastName}></input>
            </div>
           <FormGroup>
                <Form.Check type="checkbox" label="I can make good choices even if I am mad." checked={hasGoalOne} onChange={handleCheckOne}/>
                <Form.Check type="checkbox" label="I can be okay even if others are not okay." checked={hasGoalTwo} onChange={handleCheckTwo}/>
                <Form.Check type="checkbox" label="I can do something even if I don't want to (or it's hard)." checked={hasGoalThree} onChange={handleCheckThree}/>
            </FormGroup>
            <button type="submit" >Add Student</button>
        </form>
            <h2>Students</h2>
            {students.map(student => (
              <div key={student.id}>
                <p>
                  {student.first_name} {student.last_name}
                </p>
                
              </div>
        ))}
         
        
    </div>
  )
}
