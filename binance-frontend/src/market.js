import * as React from "react";
import io from 'socket.io-client';
import {Line} from "react-chartjs-2";
export default class Market extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isMonitoring: false,
            trades: [],
            movingAveragePrice: [],
            data: {
                labels: [],
                datasets: [{
                    label: 'BTC-USDT',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: []
                },
                    {
                        label: 'BTC-USDT (Moving Average)',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(0,0,200,0.6)',
                        borderColor: 'rgba(0,0,200,0.5)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(0,0,200,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(0,0,200,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: []
                    }],
            },
            totalVolume: 0,
            windowSize: 25,
            status: "-"
        };
        this.socket = null;
    }

    componentDidMount() {
        this.socket = io("ws://localhost:5555");
        this.socket.on('ticker', this.handleTrade);
    }

    handleTrade = async (trade) => {
        console.log(trade);
        trade.volume = Number(trade.price) * Number(trade.quantity);
        let status = "-";
        let trades = Array.from(this.state.trades);
        trades.push(trade);
        let total = trades.reduce((sum, trade) => sum + Number(trade.price), 0)
        let movingAverage = total / trades.length;
        if (this.state.movingAveragePrice.length > 0) {
            let firstMovingAverage = this.state.movingAveragePrice[0];
            if (firstMovingAverage < movingAverage)
                status = "Up";
            else
                status = "Down";
        }
        if (this.state.movingAveragePrice.length > 0) {
            let firstMovingAverage = this.state.movingAveragePrice[0];
            if (firstMovingAverage < movingAverage)
                status = "Up";
            else
                status = "Down";
        }
        this.state.movingAveragePrice.push(movingAverage);
        // update data & label
        this.state.data.labels.push(trade.timestamp);
        if (this.state.data.labels.length > this.state.windowSize) {
            let index = this.state.data.labels.length - this.state.windowSize;
            this.state.data.labels = this.state.data.labels.slice(index);
        }
        if (trades.length > this.state.windowSize) {
            let index = trades.length - this.state.windowSize;
            trades = trades.slice(index);
        }
        // get total volume
        let totalVolume = this.state.trades.reduce((sum, trade) => sum + trade.volume, 0).toFixed(0)

        let newState = {trades, totalVolume, status};
        newState.data = this.state.data;
        newState.data.datasets[0].data.push(Number(trade.price));
        newState.data.datasets[1].data.push(movingAverage);
        if (newState.data.datasets[0].data.length > this.state.windowSize) {
            let index = newState.data.datasets[0].data.length - this.state.windowSize;
            newState.data.datasets[0].data = newState.data.datasets[0].data.slice(index);
            newState.data.datasets[1].data = newState.data.datasets[1].data.slice(index);
        }
        this.setState(newState);
    }

    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Chart
                            [Market status: {this.state.status}][# of trades: {this.state.trades.length}][Total volume: {this.state.totalVolume}]</h4>
                    </div>
                    <div className="card-body">
                        <Line redraw
                              data={this.state.data}
                              width={600}
                              height={480}
                              options={{maintainAspectRatio: false, animation: false}}></Line>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Market Data</h4>
                    </div>
                    <div className="card-body">
                        <table className="table-sm table-hover table-striped table-responsive">
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Volume</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.trades.map((trade, i) => {
                                    return (<tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{trade.price}</td>
                                            <td>{trade.quantity}</td>
                                            <td>{trade.volume.toFixed(0)}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}