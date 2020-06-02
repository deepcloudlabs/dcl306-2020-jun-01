import * as React from "react";
import GameStatistics from "./components/game-statistics";
import ProgressBar from "./components/progressbar";
import MoveEvaluation from "./components/move-evaluation";

class Move {
    constructor(guess, message, perfectMatch, partialMatch) {
        this.guess = guess;
        this.message = message;
        this.perfectMatch = perfectMatch;
        this.partialMatch = partialMatch;
    }

}

export default class Mastermind extends React.Component {
    MAX_COUNTER = 100;

    constructor() {
        super();
        this.state = {
            gameLevel: 3,
            secret: 0,
            tries: 0,
            counter: this.MAX_COUNTER,
            guess: 123,
            moves: [],
            wins: 0,
            loses: 0
        };
    }

    componentDidMount() {
        let mastermind = localStorage.getItem("mastermind");
        if (mastermind==null || mastermind==undefined)
           localStorage.setItem("mastermind", JSON.stringify(this.state));
        else{
            mastermind = JSON.parse(mastermind);
            this.setState({
                gameLevel: mastermind.gameLevel
            })
        }
        let secret = this.createSecret(this.state.gameLevel);
        console.log(secret);
        this.setState({secret: secret});
        setInterval(this.countDown, 1000);
    }

    render() {
        let gameStatistics = "";
        if (this.state.wins > 0 || this.state.loses > 0) {
            gameStatistics = <GameStatistics wins={this.state.wins} loses={this.state.loses}></GameStatistics>;
        }
        let movesTable = "";
        if (this.state.moves.length > 0) {
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
                            this.state.moves.map((move, index) =>
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
                                <span className="badge badge-info">{this.state.gameLevel}</span>
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="tries">Tries:
                                <span className="badge badge-info">{this.state.tries}</span>
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="counter">Counter:</label>
                            <ProgressBar value={this.state.counter}> </ProgressBar>
                        </div>
                        <div className="form-group">
                            <label htmlFor="guess">Guess:</label>
                            <input type="text"
                                   value={this.state.guess}
                                   onChange={this.handleInputChange}
                                   className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <button onClick={this.play}
                                    className="btn btn-success">Play
                            </button>
                        </div>
                    </div>
                </div>
                <p></p>
                {movesTable}
                <p></p>
                {gameStatistics}
            </div>
        )
    }

    play = () => {
        let game = {...this.state}
        game.tries++;
        if (Number(game.guess) === game.secret) {
            game.gameLevel++;
            if (game.gameLevel==10){
                this.props.history.push("/wins");
            }
            game.wins++;
            this.initGame(game);
        } else {
            if (game.tries >= 10) {
                game.loses++;
                this.initGame(game);
            } else {
                game.moves.push(this.createMove(game.guess, game.secret));
            }
        }
        this.setState(game);
    }

    initGame = (game) => {
        game.tries = 0;
        game.moves = [];
        game.secret = this.createSecret(game.gameLevel);
        console.log(game.secret);
        game.counter = this.MAX_COUNTER;
        localStorage.setItem("mastermind", JSON.stringify(game));
    }

    handleInputChange = (event) => {
        let value = Number(event.target.value);
        this.setState({guess: value});
    }

    countDown = () => {
        let counter = this.state.counter;
        counter--;
        if (counter <= 0) {
            let game = {...this.state};
            game.loses++;
            this.initGame(game);
            this.setState(game);
        } else {
            this.setState({counter: counter});
        }
    }

    createSecret = (level) => {
        let digits = [];
        digits.push(this.createDigit(1, 9));
        level = Number(level);
        while (digits.length < level) {
            let number = this.createDigit(0, 9);
            if (!digits.includes(number))
                digits.push(number);
        }
        let value = 0;
        for (let digit of digits)
            value = 10 * value + digit;
        return value;
    }

    createDigit = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    createMove = (guess, secret) => {
        // Example: secret: 549, guess: 459 -> message: "-2+1", perfectMatch: 1, partialMatch: 2
        let perfectMatch = 0;
        let partialMatch = 0;
        const strSecret = secret.toString();
        const strGuess = guess.toString();
        for (let i = 0; i < strSecret.length; ++i) {
            const s = strSecret.charAt(i);
            for (let j = 0; j < strGuess.length; ++j) {
                const g = strGuess.charAt(j);
                if (s === g) {
                    if (i === j)
                        perfectMatch++;
                    else
                        partialMatch++;
                }
            }
        }
        let message = "";
        if (perfectMatch === 0 && partialMatch === 0)
            message = "No Match";
        else {
            if (partialMatch > 0)
                message = `-${partialMatch}`; // message = "-" + partialMatch
            if (perfectMatch > 0)
                message = `${message}+${perfectMatch}`;
        }
        return new Move(guess, message, perfectMatch, partialMatch);
    }
}