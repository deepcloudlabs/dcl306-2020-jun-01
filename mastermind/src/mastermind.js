import * as React from "react";

export default class Mastermind extends React.Component {
    constructor() {
        super();
        this.state = {
            gameLevel: 3,
            secret: 0,
            tries: 0,
            counter: 100,
            guess: 123,
            moves: [],
            wins: 0,
            loses: 0
        };
    }

    componentDidMount() {
        let secret = this.createSecret(this.state.gameLevel);
        console.log(secret);
        this.setState({secret: secret});
        setInterval(this.countDown, 1000);
    }

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
                                <span className="badge badge-info">{this.state.gameLevel}</span>
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="tries">Tries:
                                <span className="badge badge-info">{this.state.tries}</span>
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="counter">Counter:
                                <span className="badge badge-info">{this.state.counter}</span>
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="guess">Guess:</label>
                            <input type="text"
                                   value={this.state.guess}
                                   onChange={this.handleInputChange}
                                   className="form-control"></input>
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

    handleInputChange = (event) => {
        let value = Number(event.target.value);
        this.setState({guess: value});
    }

    countDown = () => {
        let counter = this.state.counter;
        counter--;
        if (counter <= 0) {
            //TODO: Player loses this round!
        }
        this.setState({counter: counter});
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
}