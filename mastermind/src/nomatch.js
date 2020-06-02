import React from 'react';
import {Link} from "react-router-dom";

function NoMatch() {
  return (
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Mastermind</h3>
          </div>
          <div className="card-body">
            <h1>404</h1>
            <Link to="/">Go to Mastermind!</Link>
          </div>
        </div>
      </div>
  );
}

export default NoMatch;
