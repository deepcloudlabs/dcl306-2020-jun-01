import EmployeeModel from "../model/employee";

export default function EmployeeReducer(state, action) {
    if (state === undefined) {
        return {
            employee: new EmployeeModel()
        }
    }
    let newState = {...state}; // cloning object
    switch (action.type) {
        case "find":
            newState.employee = action.employee;
            break;
        case "add":
            break;
        case "update":
            break;
        case "handle":
            newState.employee = {...state.employee};
            if (action.event.target.name === "fulltime") {
                // input checkbox
                newState.employee.fulltime = ! newState.employee.fulltime;
            } else {
                // input text
                newState.employee[action.event.target.name] = action.event.target.value;
            }
            break;
        case "handleFile":
            newState.employee = {...state.employee};
            // input file
            newState.employee.photo = action.data;
            break;
        default:
            break;
    }
    return newState;
}