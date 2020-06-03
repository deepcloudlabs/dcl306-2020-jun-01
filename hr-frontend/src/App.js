import React from 'react';
import logo from './logo.svg';
import './App.css';
import EmployeeConnector from "./component/employee-connector";
import EmployeeListConnector from "./component/employee-list-connector";

function App() {
  return (
      <div className="container">
        <EmployeeConnector />
        <p></p>
        <EmployeeListConnector />
      </div>
  );
}

export default App;
