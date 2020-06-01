import * as React from "react";

export default class Lottery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          numbers: [],
          n: 4
        };
    }
    // View
    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h1 className="card-title">Lottery</h1>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="n">n:</label>
                            <input className="form-control"
                                   value={this.state.n}
                                   type="text" id="n"></input>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success">Draw</button>
                            <button className="btn btn-warning">Reset</button>
                        </div>
                    </div>
                </div>
                <p></p>
                <div className="card">
                    <div className="card-header">
                        <h1 className="card-title">Lottery Numbers</h1>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered table-hover table-striped table-responsive">
                            <thead>
                               <tr>
                                   <th>1<sup>st</sup> Number</th>
                                   <th>2<sup>nd</sup> Number</th>
                                   <th>3<sup>rd</sup> Number</th>
                                   <th>4<sup>th</sup> Number</th>
                                   <th>5<sup>th</sup> Number</th>
                                   <th>6<sup>th</sup> Number</th>
                               </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}