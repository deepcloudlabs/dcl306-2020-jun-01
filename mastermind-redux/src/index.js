import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Mastermind from "./mastermind";
import 'bootstrap/dist/css/bootstrap.css';
import 'toastr/build/toastr.css';

import {Route, BrowserRouter as Router} from "react-router-dom";
import App from "./App";
import UserWins from "./components/userwins";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import GameReducer from "./reducer/game-reducer";
import MastermindConnector from "./components/game-connector";
import GameStatisticsConnector from "./components/gamestatistics-connector";

let reducers = combineReducers({gameStore: GameReducer});

let store = createStore(reducers);

const routing = (
    <Provider store={store}>
        <Router>
            <div>
                <Route path="/" exact component={App}></Route>
                <Route path="/console" exact component={MastermindConnector}></Route>
                <Route path="/statistics" exact component={GameStatisticsConnector}></Route>
                <Route path="/wins" exact component={UserWins}></Route>
            </div>
        </Router>
    </Provider>
);
ReactDOM.render(routing, document.getElementById('root'));
/*
ReactDOM.render(
  <React.StrictMode>
    <Mastermind />
  </React.StrictMode>,
  document.getElementById('root')
);
*/
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
