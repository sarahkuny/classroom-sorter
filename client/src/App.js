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
    setIsBannerView(false)
        })
      .catch(error => {
        console.log(error);
      });
      })
  }

  const changeBannerView = ()=> {
    setIsBannerView(state => !state)
  }

  const changeGroupView = () => {
    setIsGroupView(state => !state)
  }
  return (
    <div className="app">
      {/* <Navbar /> */}
      {isBannerView ? <Banner switchToRoster={changeBannerView} /> : ""}
      {isGroupView ? <GroupView  students={students} groupNo = {groupNo} switchToRoster={changeGroupView}/> : <RosterView createGroups={(groupNo) => handleCreateGroups(groupNo)} switchToGroups={changeGroupView} /> }
    </div>
  );
}

export default App;
