import * as React from "react";

export default class Employee extends React.Component {
    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <h1 className="card-title">Employee Panel</h1>
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="identityNo">Identity No:</label>
                        <input type="text"
                               name="identityNo"
                               id="identityNo"
                               className="form-control"
                               value={this.props.employee.identityNo}
                               onChange={this.props.handleInput}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="fullname">Full Name:</label>
                        <input type="text"
                               name="fullname"
                               id="fullname"
                               className="form-control"
                               value={this.props.employee.fullname}
                               onChange={this.props.handleInput}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="iban">Iban:</label>
                        <input type="text"
                               name="iban"
                               id="iban"
                               className="form-control"
                               value={this.props.employee.iban}
                               onChange={this.props.handleInput}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="salary">Salary:</label>
                        <input type="text"
                               name="salary"
                               id="salary"
                               className="form-control"
                               value={this.props.employee.salary}
                               onChange={this.props.handleInput}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="birthYear">Birth Year:</label>
                        <input type="text"
                               name="birthYear"
                               id="birthYear"
                               className="form-control"
                               value={this.props.employee.birthYear}
                               onChange={this.props.handleInput}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="department">Department:</label>
                        <select type="text"
                                name="department"
                                id="department"
                                className="form-control"
                                value={this.props.employee.department}
                                onChange={this.props.handleInput}>
                            <option>IT</option>
                            <option>SALES</option>
                            <option>HR</option>
                            <option>FINANCE</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="photo">Photo:</label>
                        <input type="file"
                               className="form-control"
                               name="photo"
                               id="photo"/>
                        <img className="img-thumbnail"
                             style={{width: '128px', height: '128px'}}
                             src={this.props.employee.photo}
                             alt=""></img>
                    </div>
                    <div className="form-group">
                        <div className="checkbox">
                            <input type="checkbox"
                                   name="fulltime"
                                   id="fulltime"
                                   className="form-check-input"
                                   chekced={this.props.employee.fulltime}
                                   onChange={this.props.handleInput}/>
                            <label className="form-check-label">Fulltime?</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-success"
                             onClick={ () => this.props.findEmployee(this.props.employee.identityNo)}>Find</button>
                        <button className="btn btn-warning"
                             onClick={ () => this.props.addEmployee(this.props.employee)}>Hire</button>
                        <button className="btn btn-warning"
                             onClick={ () => this.props.updateEmployee(this.props.employee)}>Update</button>
                        <button className="btn btn-danger"
                             onClick={ () => this.props.removeEmployee(this.props.employee.identityNo)}>Find</button>
                    </div>
                </div>

            </div>
        );
    }
}