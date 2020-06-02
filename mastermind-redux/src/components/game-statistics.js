import * as React from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

export default class GameStatistics extends React.PureComponent {

    render() {
        return (
            <div className="container">
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
                                <td>{this.props.statistics.wins} out
                                    of {this.props.statistics.wins + this.props.statistics.loses}</td>
                            </tr>
                            <tr>
                                <td>Loses</td>
                                <td>{this.props.statistics.loses} out
                                    of {this.props.statistics.wins + this.props.statistics.loses}</td>
                            </tr>
                            </tbody>
                        </table>
                        <Link to="/console">Continue to the game!</Link>
                    </div>
                </div>
            </div>
        );
    }
}