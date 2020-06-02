import Employee from "./employee";
import {connect} from "react-redux";

let mapStateToProps = function(state){
    return {
        employee : state.employeeStore.employee
    }
};
let mapDispatchToProps = function(dispatch){
    return {
        findEmployee : async function(identity){
            let employee = {};
            return dispatch({type: "find", employee})
        }
    }
};
let EmployeeConnector =
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Employee);

export default EmployeeConnector;