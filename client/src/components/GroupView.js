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
    <div>
    
    {Object.keys(groups).map((group) => (
      <div>
        <h4>Group {group}</h4>
        <ul>
          {groups[group].map((student) => (
            <li>{student.first_name}</li>
          ))}
        </ul>
      </div>
    ))}
    <button>Edit Students</button>
    </div>

  )
}

