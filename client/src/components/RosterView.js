import React, { useEffect, useState } from 'react'
import {Button, Form, FormControl, FormGroup, ToggleButton} from 'react-bootstrap'

export default function RosterView() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [hasGoalOne, setHasGoalOne] = useState(false);
  const [hasGoalTwo, setHasGoalTwo] = useState(false);
  const [hasGoalThree, setHasGoalThree] = useState(false);
  const [student, setStudent] = useState();
  
  const handleFirstNameChange = (event) => {
    let input = event.target.value;
    setFirstName(input);
  };

  const handleLastNameChange = (event) => { 
    let input = event.target.value;
    setLastName(input);
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

  const handleAddStudent = (e) => {
    e.preventDefault();
    setStudent(
        {firstName: firstName,
        lastName: lastName,
        hasGoalOne: hasGoalOne,
        hasGoalTwo: hasGoalTwo,
        hasGoalThree: hasGoalThree}
    )
      //post request 
      //setStudents(response)
      
      setFirstName("");
      setLastName("");

  }
    return (
    <div>
        <form>
            <div className="name-input">
                <label>First Name</label>
                <input onChange={handleFirstNameChange} value={firstName}></input>
            </div>
            <div className="name-input">
                <label>Last Name</label>
                <input onChange={handleLastNameChange} value={lastName}></input>
            </div>
           <FormGroup>
                <Form.Check type="checkbox" label="I can make good choices even if I am mad." checked={hasGoalOne} onChange={handleCheckOne}/>
                <Form.Check type="checkbox" label="I can be okay even if others are not okay." checked={hasGoalTwo} onChange={handleCheckTwo}/>
                <Form.Check type="checkbox" label="I can do something even if I don't want to (or it's hard)." checked={hasGoalThree} onChange={handleCheckThree}/>
            </FormGroup>
            <Button  onClick={handleAddStudent}>Add Student</Button>
            <h2>Students</h2>
            {/* map through students to display */}
        </form>
    </div>
  )
}
