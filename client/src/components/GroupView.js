import React, {useEffect, useState} from 'react'

export default function GroupView(props) {
  const [groups, setGroups] = useState({});
  
  useEffect(() => {
    filterStudents();
    //in JSX loop through groupsObj
      //map through each array
    
    }, []);

  const filterStudents = () => {
   //generate arrays for each group_id
    let groupsObj = {};
    for (let i = 1; i <= props.groupNo; i++){
      let key = i.toString();
      groupsObj[key] = [];
    }
    //sort students into corresponding array
    for (let i = 1; i <= props.groupNo; i++){
      let student = props.students[i];
      if (student.group_id === i){
        groupsObj[i.toString()].push(student)
      }
    }
    console.log(groupsObj)
    //set state to groupsObj that holds group arrays
    setGroups(groupsObj);
  }
  

 
  return (
    <div>
    {/* access props.students to get data
    filter by group no (up to groupNo passed in --> props.groupNo) */}
    <button>Edit Students</button>
    </div>

  )
}

