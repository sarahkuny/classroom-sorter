import React, { useEffect, useState } from "react";
import './App.css';
import GroupView from "./components/GroupView";
import RosterView from "./components/RosterView";

function App() {
  return (
    <div className="App">
      <GroupView />
      <RosterView />
    </div>
  );
}

export default App;
