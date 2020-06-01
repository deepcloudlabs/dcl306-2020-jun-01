import * as React from "react";
import PropTypes from 'prop-types';

export default class LotteryRow extends React.Component {
    static propTypes = {
        numbers: PropTypes.array.isRequired,
        removeAction: PropTypes.func.isRequired,
        rowIndex: PropTypes.number.isRequired
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr key={this.props.rowIndex}>
                <td>{this.props.rowIndex + 1}</td>
                {this.props.numbers.map((num, j) =>
                    <td>{num}</td>)
                }
                <td>
                    <button  onClick={() => this.props.removeAction(this.props.rowIndex)}
                             className="btn btn-danger">Delete</button>
                </td>
            </tr>
        );
    }
}