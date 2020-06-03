import {showSuccessMessage} from "../toastr-util";
import Game from "../model/game";
import GameStatisticsModel from "../model/statistics";
import Move from "../model/move";

function initGame(game) {
    game.tries = 0;
    game.moves = [];
    game.secret = game.createSecret(game.level);
    game.counter = 100;
    return game;
}

function createMove(guess, secret) {
    let perfectMatch = 0;
    let partialMatch = 0;
    const strSecret = secret.toString();
    const strGuess = guess.toString();
    for (let i = 0; i < strSecret.length; ++i) {
        const s = strSecret.charAt(i);
        for (let j = 0; j < strGuess.length; ++j) {
            const g = strGuess.charAt(j);
            if (s === g) {
                if (i === j)
                    perfectMatch++;
                else
                    partialMatch++;
            }
        }
    }
    let message = "";
    if (perfectMatch === 0 && partialMatch === 0)
        message = "No Match";
    else {
        if (partialMatch > 0)
            message = `-${partialMatch}`; // message = "-" + partialMatch
        if (perfectMatch > 0)
            message = `${message}+${perfectMatch}`;
    }
    return new Move(guess, message, perfectMatch, partialMatch);
}

export default function GameReducer(state, action) { // reducer function
    if (state === undefined) {
        return {
            game: initGame(new Game()),
            statistics: new GameStatisticsModel()
        };
    }
    let newState = {...state}; // ES6

    switch (action.type) {
        case "play":
            newState.game = {...state.game};
            newState.statistics = {...state.statistics};
            newState.game.tries++;
            if (Number(newState.game.guess) === newState.game.secret) {
                newState.game.level++;
                if (newState.game.level === 10) {
                    //this.props.history.push("/wins");
                }
                newState.statistics.wins++;
                initGame(newState.game);
            } else {
                if (newState.game.tries >= 10) {
                    newState.statistics.loses++;
                    initGame(newState.game);
                } else {
                    newState.game.moves.push(createMove(newState.game.guess, newState.game.secret));
                }
            }
            break;
        case "handle":
            newState.game = {...state.game}
            newState.game.guess = Number(action.event.target.value);
            break;
        default:
    }
    console.log("Returning new state...")
    console.log(newState);
    return newState;
}