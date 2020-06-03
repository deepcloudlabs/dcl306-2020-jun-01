import * as React from "react";

export default class EmployeeList extends React.Component {
    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <h1 className="card-title">Employee List</h1>
                    <button className="btn btn-success">Retrieve All</button>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>Photo</th>
                            <th>Identity</th>
                            <th>Fullname</th>
                            <th>Iban</th>
                            <th>Salary</th>
                            <th>Birth Year</th>
                            <th>Department</th>
                            <th>Full time?</th>
                            <th>Operation</th>
                        </tr>
                        </thead>
                        <tbody>{
                         this.props.employees.map((emp,i) => <tr>
                                 <td>{i+1}</td>
                             <td><img src={emp.photo}></img></td>
                             <td>{emp.identity}</td>
                             <td>{emp.fullname}</td>
                             <td>{emp.iban}</td>
                             <td>{emp.salary}</td>
                             <td>{emp.birthYear}</td>
                             <td>{emp.department}</td>
                             <td>{emp.fulltime ? 'Fulltime' : 'Parttime'}</td>
                             <td><button className="btn btn-danger">Fire</button></td>
                             </tr>
                         )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}