import React, { useEffect, useState } from "react";
import './App.css';
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import GroupView from "./components/GroupView";
import RosterView from "./components/RosterView";
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <Banner />
      <RosterView />
      <GroupView />
    </div>
  );
}

export default App;
