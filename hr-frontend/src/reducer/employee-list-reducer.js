import EmployeeModel from "../model/employee";

export default function EmployeeListReducer(state, action) {
    if (state === undefined) {
        return {
            employees: []
        }
    }
    let newState = {...state};
    switch(action.type){
        case "retrieve":
            newState.employees = action.employees;
            break;
        case "fire":
            let identity = action.employee.identityNo;
            newState.employees = newState.employees.filter( emp => emp.identityNo != identity);
            break;
        default:
    }
    return newState;
}