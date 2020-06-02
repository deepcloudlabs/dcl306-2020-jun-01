import * as React from "react";
import PropTypes from 'prop-types';

export default class GameStatistics extends React.PureComponent {
    static propTypes = {
        wins: PropTypes.number.isRequired,
        loses: PropTypes.number.isRequired
    }

    render() {
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
                                <td>5 out of 8</td>
                            </tr>
                            <tr>
                                <td>Loses</td>
                                <td>3 out of 8</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}