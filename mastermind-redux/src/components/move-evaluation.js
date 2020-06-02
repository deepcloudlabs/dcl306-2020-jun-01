import PropTypes from 'prop-types';
import * as React from "react";

export default class MoveEvaluation extends React.Component {
    static propTypes = {
        perfectMatch: PropTypes.number.isRequired,
        partialMatch: PropTypes.number.isRequired
    }

    render() {
        let noMatchSpan = "";
        let perfectSpan = "";
        let partialSpan = "";
        if (this.props.partialMatch > 0) {
            partialSpan = <span className="badge badge-danger">{this.props.partialMatch}</span>;
        }
        if (this.props.perfectMatch > 0) {
            perfectSpan = <span className="badge badge-success">{this.props.perfectMatch}</span>;
        }
        if (this.props.perfectMatch === 0 && this.props.partialMatch === 0) {
            noMatchSpan = <span className="badge badge-info">No match!</span>;
        }
        return (
            <div>
                {noMatchSpan}{partialSpan}{perfectSpan}
            </div>
        );
    }
}