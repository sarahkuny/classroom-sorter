import React, { useEffect, useState } from "react";
import './App.css';
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import GroupView from "./components/GroupView";
import RosterView from "./components/RosterView";
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [isGroupView, setIsGroupView] = useState(false);
  const [students, setStudents] = useState([]);
  const [groupNo, setGroupNo] = useState();

  const handleCreateGroups = (groupNo) => {
    console.log(groupNo)
    //SORT REQUEST
    //GET JOINED
    //SEND JOINED TO GROUPVIEW THROUGH PROPS
    setGroupNo(groupNo);
    setIsGroupView(true);
  }

  return (
    <div className="app">
      <Navbar />
      <Banner />
      {isGroupView ? <GroupView  students={students} groupNo = {groupNo} /> : <RosterView createGroups={(groupNo) => handleCreateGroups(groupNo)} /> }
    </div>
  );
}

export default App;
