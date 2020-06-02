import EmployeeModel from "../model/employee";

export default function EmployeeReducer(state,action) {
    if (state === undefined) {
        return {
            employee : new EmployeeModel()
        }
    }
    let newState = {...state}; // cloning object
    switch(action.type){
        case "find":
            newState.employee = action.employee;
            break;
        case "add":
            break;
        case "update":
            break;
        case "handle":
                newState.employee = {...state.employee};
                newState.employee[action.event.target.name] = action.event.target.value;
            break;
        default:
            break;
    }
    return newState;
}