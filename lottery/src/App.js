import React from 'react';
import './App.css';
import Lottery from "./lottery";

function App() {
  return (
    <Lottery min="1" max="100" size="8" sorted="false"/>
  );
}

export default App;
