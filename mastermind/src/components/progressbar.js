import * as React from "react";
import PropTypes from 'prop-types';

export default class ProgressBar extends React.Component {
    static propTypes = {
        value: PropTypes.number.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            progressBarClass: "progress-bar bg-info",
            width: {width: "100%"}
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.value != this.props.value) {
            let progressBarClass = "progress-bar bg-info";
            if (this.props.value < 30)
                progressBarClass = "progress-bar bg-danger"
            else if (this.props.value < 60)
                progressBarClass = "progress-bar bg-warning";
            else if (this.props.value < 80)
                progressBarClass = "progress-bar bg-default";
            this.setState({
                width: {width: this.props.value + '%'},
                progressBarClass: progressBarClass
            })
        }
    }

    render() {
        return (
            <div className="progress">
                <div role="progressbar"
                     aria-valuemin="0"
                     aria-valuemax="100"
                     style={this.state.width}
                     className={this.state.progressBarClass}>
                    {this.props.value}%
                </div>
            </div>
        );
    }
}