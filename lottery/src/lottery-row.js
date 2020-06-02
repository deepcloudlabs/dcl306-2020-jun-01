import * as React from "react";
import PropTypes from 'prop-types';

export default class LotteryRow extends React.Component {
    static propTypes = {
        numbers: PropTypes.array.isRequired,
        removeAction: PropTypes.func.isRequired,
        rowIndex: PropTypes.number.isRequired
    }
    componentDidMount() {
        console.log('did mount');
    }

    componentDidUpdate() {
        console.log('updated');
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log(nextProps.numbers)
        console.log(this.props.numbers)
        return !nextProps.numbers.length === this.props.numbers.length && nextProps.numbers.every((value, index) => { return value === this.props.numbers[index]});
    }

    render() {
        console.log("LotteryRow.render()"+this.props.rowIndex);
        return (
            <tr key={this.props.rowIndex}>
                <td key="first">{this.props.rowIndex + 1}</td>
                {this.props.numbers.map((num, j) =>
                    <td key={j}>{num}</td>)
                }
                <td key="last">
                    <button  onClick={() => this.props.removeAction(this.props.rowIndex)}
                             className="btn btn-danger">Delete</button>
                </td>
            </tr>
        );
    }
}