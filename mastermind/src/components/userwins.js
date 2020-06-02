import React from 'react';
import {Link} from "react-router-dom";

function UserWins() {
    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Mastermind</h3>
                </div>
                <div className="card-body">
                    <h1>TODO: Tebrikler!</h1>
                    <Link to="/console">Want to play again!</Link>
                </div>
            </div>
        </div>
    );
}

export default UserWins;
