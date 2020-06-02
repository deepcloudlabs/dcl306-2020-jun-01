import * as React from "react";

export default class Mastermind extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Game Console</h3>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="gameLevel">Game Level:
                               <span className="badge badge-info"></span>
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="tries">Tries:
                               <span className="badge badge-info"></span>
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="counter">Counter:
                               <span className="badge badge-info"></span>
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="guess">Guess:</label>
                            <input type="text" className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success">Play</button>
                        </div>
                    </div>
                </div>
                <p></p>
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Moves</h3>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered table-striped table-hover table-responsive">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Guess</th>
                                    <th>Evaluation</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}