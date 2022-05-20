import React, { useEffect, useState } from "react";
import './App.css';
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import GroupView from "./components/GroupView";
import RosterView from "./components/RosterView";
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [isGroupView, setIsGroupView] = useState(false);
  const [isBannerView, setIsBannerView] = useState(true);
  const [students, setStudents] = useState([]);
  const [groupNo, setGroupNo] = useState();

  useEffect(() => {
  }, [])
  const  handleCreateGroups = (groupNo) => {
    //hit sorting endpoint
    fetch(`api/students/sort/${groupNo}`,  {
      method:"PUT",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(() => {
        fetch("/api/students/joined")
      .then(response => response.json())
      .then(students => {
        setStudents(students);
      })
        .then(() => {
          setGroupNo(groupNo);
    setIsGroupView(true);
        })
      .catch(error => {
        console.log(error);
      });
      })
  }

  const changeView = ()=> {
    setIsBannerView(state => !state)
  }
  return (
    <div className="app">
      {/* <Navbar /> */}
      {isBannerView ? <Banner switchToRoster={changeView} /> : ""}
      {isGroupView ? <GroupView  students={students} groupNo = {groupNo} /> : <RosterView createGroups={(groupNo) => handleCreateGroups(groupNo)} /> }
    </div>
  );
}

export default App;
