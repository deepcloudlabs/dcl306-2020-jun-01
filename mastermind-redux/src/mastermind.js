import * as React from "react";
import GameStatistics from "./components/game-statistics";
import ProgressBar from "./components/progressbar";
import MoveEvaluation from "./components/move-evaluation";
import GameStatisticsConnector from "./components/gamestatistics-connector";
import {Link} from "react-router-dom";

export default class Mastermind extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        let movesTable = "";
        if (this.props.game.moves.length > 0) {
            movesTable = <div className="card">
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
                        <tbody>{
                            this.props.game.moves.map((move, index) =>
                                <tr key={move.guess}>
                                    <td>{index + 1}</td>
                                    <td>{move.guess}</td>
                                    <td><MoveEvaluation partialMatch={move.partialMatch}
                                                        perfectMatch={move.perfectMatch}></MoveEvaluation></td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>;
        }
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Game Console</h3>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="gameLevel">Game Level:
                                <span className="badge badge-info">{this.props.game.level}</span>
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="tries">Tries:
                                <span className="badge badge-info">{this.props.game.tries}</span>
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="counter">Counter:</label>
                            <ProgressBar value={this.props.game.counter}> </ProgressBar>
                        </div>
                        <div className="form-group">
                            <label htmlFor="guess">Guess:</label>
                            <input type="text" value={this.props.game.guess} onChange={this.props.handleInput}
                                   className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <button onClick={this.props.play} className="btn btn-success">Play</button>
                        </div>
                    </div>
                </div>
                <p></p>
                {movesTable}
                <p></p>
                <Link to="/statistics">Look statistics!</Link>
            </div>
        )
    }





}