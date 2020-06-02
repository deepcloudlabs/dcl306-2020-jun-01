import Employee from "./employee";
import {connect} from "react-redux";
import {showSuccessMessage} from "../utility/toastr-util";

let mapStateToProps = function(state){
    return {
        employee : state.employeeStore.employee
    }
};
let mapDispatchToProps = function(dispatch){
    return {
        findEmployee : async function(identity){
            let employee = await fetch(`http://localhost:4001/employees/${identity}`)
                .then(res => res.json());
            showSuccessMessage("Employee is retrieved");
            return dispatch({type: "find", employee: employee})
        },
        addEmployee : async function(emp) {
            let response = await fetch("http://localhost:4001/employees",{
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
              },
              body: JSON.stringify(emp)
            }).then(res => res.json());
            if (response.status === "OK")
              showSuccessMessage("Employee is hired");
            return dispatch({type: "add"}, response) ;
        },
        updateEmployee : async function(emp) {
            let response = await fetch("http://localhost:4001/employees",{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(emp)
            }).then(res => res.json());
            if (response.status === "OK")
                showSuccessMessage("Employee is hired");
            return dispatch({type: "update"}, response) ;
        },
        handleInput : function(event){
            return dispatch({type: "handle", event});
        }
    }
};
let EmployeeConnector =
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Employee);

export default EmployeeConnector;