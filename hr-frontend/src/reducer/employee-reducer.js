import EmployeeModel from "../model/employee";

export default function EmployeeReducer(state,action) {
    if (state === undefined) {
        return {
            employee : new EmployeeModel()
        }
    }
    let newState = {...state};
    switch(action.type){
        case "find":
            //TODO: Make rest call to find employee by identity
            break;
        case "add":
            //TODO: Make rest call to add employee
            break;
        case "update":
            //TODO: Make rest call to update employee
            break;
        default:
            break;
    }
    return newState;
}