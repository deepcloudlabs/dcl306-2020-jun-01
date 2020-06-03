import {connect} from "react-redux";
import EmployeeList from "./employee-list";

let mapStateToProps = function(state){
    return {
        employees : state.employeeListStore.employees
    }
};
let mapDispatchToProps = function(dispatch){
    return {
        fireEmployee: async (identity) => {
            // DELETE http://localhost:4001/employees/identity
            let removedEmp = await fetch(`http://localhost:4001/employees/${identity}` , {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }).then(res => res.json())
            return dispatch({type: 'fire', employee: removedEmp})

        },
        retrieveEmployees : async () => {
            // GET http://localhost:4001/employees
            fetch('http://localhost:4001/employees')
                .then(res => res.json())
                .then( employees => dispatch({type: "retrieve", employees}))
        }
    }
};
let EmployeeListConnector =
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EmployeeList);

export default EmployeeListConnector;