import * as React from "react";
import PropTypes from 'prop-types';
import LotteryRow from "./lottery-row";

export default class Lottery extends React.Component {
    static propTypes = {
        min: PropTypes.number,
        max: PropTypes.number,
        size: PropTypes.number,
        sorted: PropTypes.bool
    }
    static defaultProps = {
        min: 1,
        max: 49,
        size: 6,
        sorted: true
    }

    /*
        shouldComponentUpdate(nextProps, nextState, nextContext) {
            // mutable state -> shallow diff
            let diff = nextState.numbers !== this.state.numbers;
            // prop/state -> immutable
            return diff;
        }
    */
    constructor(props) {
        super(props);
        console.log("constructor(props)")
        this.state = {
            numbers: [],
            n: 1
        };
    }

    // View
    render() {
        console.log("Lottery.render()")
        let table = "";
        if (this.state.numbers.length > 0) {
            table = <div className="card">
                <div className="card-header">
                    <h1 className="card-title">Lottery Numbers</h1>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-hover table-striped table-responsive">
                        <thead>
                        <tr>
                            <th>No</th>
                            {
                                Array.from(Array(Number(this.props.size)).keys()).map(column => <th
                                    key={'col' + column}>Column #{column + 1}</th>)
                            }
                            <th>Operations</th>
                        </tr>
                        </thead>
                        <tbody>{
                            this.state.numbers.map((lotteryNumber, i) => <LotteryRow numbers={lotteryNumber}
                                                                                     key={lotteryNumber.toString()}
                                                                                     removeAction={this.removeRow}
                                                                                     rowIndex={i}></LotteryRow>)
                        }</tbody>
                    </table>
                </div>
            </div>;
        }
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h1 className="card-title">Lottery</h1>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="n">n:</label>
                            <input className="form-control"
                                   value={this.state.n}
                                   onChange={this.handleInputChange}
                                   type="text" id="n"></input>
                        </div>
                        <div className="form-group">
                            <button onClick={this.drawNumbers}
                                    className="btn btn-success">Draw
                            </button>
                            <button onClick={this.resetNumbers}
                                    className="btn btn-warning">Reset
                            </button>
                        </div>
                    </div>
                </div>
                <p></p>
                {table}
            </div>
        );
    }
    //
    // WebSocket -> send event (JSON) -> callback : (Near) Real-time
    // FileReader -> callback, Fetch API -> Rest GET/PUT/DELETE -> callback
    // user event
    // timer event: setInterval(), setTimeout()
    // user event
    handleInputChange = (event) => {
        let target = event.target;
        let value = target.value;
        let newValue = Number(value);
        this.setState({
            n: newValue
        });
    }

    drawNumbers = () => {
        let lotteryNumbers = this.state.numbers;
        let rows = this.state.n;
        for (let i = 0; i < rows; ++i) {
            lotteryNumbers.push(this.createNumbers());
        }
        this.setState({
            numbers: lotteryNumbers
        }) // -> render()
    }

    resetNumbers = () => {
        this.setState({
            numbers: []
        })
    }

    createNumbers = () => {
        let array = [];
        while (array.length < this.props.size) {
            let number = this.createNumber(Number(this.props.min), Number(this.props.max));
            if (!array.includes(number))
                array.push(number);
        }
        if (this.props.sorted === true)
            array.sort((x, y) => x - y);
        return array;
    }

    createNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    removeRow = (index) => {
        let numbers = this.state.numbers;
        numbers.splice(index, 1);
        this.setState({
            numbers: numbers
        });
    }
}