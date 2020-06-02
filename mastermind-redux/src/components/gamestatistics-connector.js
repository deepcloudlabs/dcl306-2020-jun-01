import {connect} from "react-redux";
import {showSuccessMessage} from "../toastr-util";
import GameStatistics from "./game-statistics";

let mapDispatchToProps = (dispatch) => {
    return {
    }
}

let mapStateToProps = (state) => {
    return {
        game : state.gameStore.game,
        statistics : state.gameStore.statistics
    }
}

let GameStatisticsConnector = connect(
    mapStateToProps,
    mapDispatchToProps
)(GameStatistics);

export default GameStatisticsConnector;