import React, {useEffect, useState} from 'react'

export default function GroupView(props) {
  const [groups, setGroups] = useState({});
  
  useEffect(() => {
    setGroups(filterStudents());
    }, []);

  const filterStudents = () => {
   //generate arrays for each group_id
    let groupsObj = {};
    for (let i = 1; i <= props.groupNo; i++){
      let key = i.toString();
      groupsObj[key] = [];
    }
    //sort students into corresponding array
    for (let i = 0; i < props.students.length; i++){
      let student = props.students[i];
      for (let j = 1; j <= props.groupNo; j++){
        if (student.group_id === j){
          groupsObj[j.toString()].push(student)
        }
      }
    }
    //set state to groupsObj that holds group arrays
    return groupsObj
  }
    
  
  

 
  return (
    <>
    <div className="group-view">
      <h1>Sorted Groups</h1>
      <div className="grid">
        {Object.keys(groups).map((group) => (
          <div className="group">
            <h4>Group {group}</h4>
            <ul>
              {groups[group].map((student) => (
                <li>{student.first_name} {student.last_name} <span>{student.score}</span></li>
              ))}
            </ul>
          </div>
        ))}
        </div>
      <button className="switch-view-btn" onClick={props.switchToRoster}>Switch to Roster View</button>
    </div>
    </>
  )
}

