import React, { useEffect, useState } from 'react'

export default function RosterView() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [hasGoalOne, setHasGoalOne] = useState(false);
  const [hasGoalTwo, setHasGoalTwo] = useState(false);
  const [hasGoalThree, setHasGoalThree] = useState(false);
  
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

  const handleCheckThree = (event) => {
      setHasGoalThree(event.target.checked)
  }

  const handleAddStudent = (e) => {
      e.preventDefault();
      //post request to students
      //setStudents(response)
      //post request to behaviors
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
            <div className="goal-selection">
                <label>I can make good choices even if I am mad.</label>
                <input type="checkbox" checked={hasGoalOne}  onClick={handleCheckOne}></input>
            </div>
            <div className="goal-selection">
                <label>I can be okay even if others are not okay.</label>
                <input type="checkbox" checked={hasGoalTwo} onClick={handleCheckTwo}></input>
            </div>
            <div className="goal-selection">
                <label>I can do something even if I don't want to (or it's hard).</label>
                <input type="checkbox" checked={hasGoalThree} onClick={handleCheckThree}></input>
            </div>
            <button onClick={handleAddStudent}>Add Student</button>
        </form>
    </div>
  )
}
