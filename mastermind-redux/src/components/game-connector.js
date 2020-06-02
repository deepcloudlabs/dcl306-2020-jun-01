import {connect} from "react-redux";
import {showSuccessMessage} from "../toastr-util";
import Mastermind from "../mastermind";

let mapDispatchToProps = function(dispatch){
    return {
        play: async function(identity){
            return dispatch({type: 'play'});
        },
        handleInput: async function(event){
            return dispatch({type: 'handle', event})
        }
    }
}

let mapStateToProps = function(state){
    return {
        game : state.gameStore.game,
        statistics : state.gameStore.statistics
    }
}

let MastermindConnector = connect(
    mapStateToProps,
    mapDispatchToProps
)(Mastermind);

export default MastermindConnector;