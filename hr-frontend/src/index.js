import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import EmployeeReducer from "./reducer/employee-reducer";
import EmployeeListReducer from "./reducer/employee-list-reducer";

let reducers = combineReducers({employeeStore: EmployeeReducer, employeeListStore : EmployeeListReducer});

let store = createStore(reducers);
console.log(store.getState());

ReactDOM.render(
    <Provider store={store}><App /></Provider>
 ,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
