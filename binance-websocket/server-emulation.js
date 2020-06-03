const port = 5555;

let mongoose = require('mongoose');

// Mongoose
const connectionUrl = 'mongodb://localhost:27017/tradedb';

mongoose.connect(connectionUrl, {
    "useNewUrlParser": true,
    "socketTimeoutMS": 0,
    "keepAlive": true,
    "useUnifiedTopology": true
});

let tradeSchema = new mongoose.Schema({
    "symbol": String,
    "price": String,
    "quantity": String,
    "timestamp": Number
});

let Trade = mongoose.model("trades", tradeSchema);

const WebSocket = require('ws');

// socket.io
let express = require('express');
let sockets = [];
let app = express();
let server = app.listen(port);
let io = require('socket.io').listen(server);
io.on('connection', (socket) => {
    sockets.push(socket);
    console.log("New client connected!");
    socket.on('disconnect', () => {
        let index = sockets.indexOf(socket);
        sockets.splice(index, 1);
    });
});

setInterval(() => {
    let model = {
        "symbol": "BTCUSDT",
        "price": 9000+5.0 * (Math.random()-0.5),
        "quantity": 2.0 * Math.random(),
        "timestamp": new Date().toTimeString()
    };
    sockets.forEach(socket => {
        socket.emit('ticker', model);
    })

}, 1000);
