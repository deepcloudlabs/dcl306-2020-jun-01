import * as React from "react";
import PropTypes from 'prop-types';

export default class GameStatistics extends React.Component {
    static propTypes = {
        wins: PropTypes.number.isRequired,
        loses: PropTypes.number.isRequired
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.wins !== nextProps.wins || this.props.loses !== nextProps.loses;
    }

    render() {
        console.log("GameStatistics.render()");
        return (
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Game Statistics</h3>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>Value</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Wins</td>
                                <td>{this.props.wins} out of {this.props.wins+this.props.loses}</td>
                            </tr>
                            <tr>
                                <td>Loses</td>
                                <td>{this.props.loses} out of {this.props.wins+this.props.loses}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}