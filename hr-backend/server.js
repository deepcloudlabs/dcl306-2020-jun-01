// Express
import logger from "morgan";
import utils from "./utils";
import express from "express";
import bodyParser from "body-parser";

const port = 4001;
const app = express();

app.use(bodyParser.json({limit: '5mb'}))
app.use(logger('dev'));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "HEAD, GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
    next();
});
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(port);
console.log('Server is running at ' + port);

// MongoDB
const mongoose = require('mongoose');
const mongodbUrl = "mongodb://localhost:27017/hr";

mongoose.connect(mongodbUrl, {
    "useNewUrlParser": true,
    "socketTimeoutMS": 0,
    "keepAlive": true,
    "useUnifiedTopology": true
});

const employeeSchema = new mongoose.Schema({
    "_id": mongoose.Schema.Types.ObjectId,
    "fullname": {
        type: String,
        required: true,
        minLength: 5
    },
    "identityNo": {
        type: String,
        required: true,
        validate: [utils.tcKimlikNoValidator, 'You must provide a valid identity no.']
    },
    "photo": {
        type: String,
        required: false,
        default: utils.NO_IMAGE
    },
    "salary": {
        type: Number,
        required: true,
        min: 2000,
        default: 2000
    },
    "iban": {
        type: String,
        required: true,
        validate: [utils.ibanValidator, 'You must provide a valid iban.']
    },
    "birthYear": {
        type: Number,
        required: false,
        min: 18
    },
    "fulltime": {
        type: Boolean,
        required: true,
        default: true
    },
    "department": {
        type: String,
        enum: ["IT", "Sales", "Finance", "HR"],
        default: "Sales"
    }
});

const Employee = mongoose.model('employees', employeeSchema);

// REST API
// http://localhost:4001/employees?page=1&size=1
app.get('/employees', (req, res) => {
    let page = Number(req.query.page) || 1;
    let size = Number(req.query.size) || 10;
    let offset = (page - 1) * size;
    Employee.find({},
        {"__v": false, "_id": false},
        {skip: offset, limit: size},
        function (err, employees) {
            res.set("Content-Type: application/json");
            res.status(200).send(employees);
        });
});

// GET http://localhost:4001/employees/1
app.get('/employees/:identityNo', (req, res) => {
    let identityNo = req.params.identityNo;
    Employee.findOne({'identityNo': identityNo},
        {"__v": false, "_id": false},
        function (err, employee) {
            res.set("Content-Type: application/json");
            if (employee == null) {
                res.status(404)
                    .send({'status': 'Employee is not found!'});
            } else {
                res.status(200).send(employee);
            }
        });
});

app.post("/employees", (req, res) => {
    let emp = req.body;
    emp._id = mongoose.Types.ObjectId();
    let employee = new Employee(emp);
    employee.save((err, newemp) => {
        res.set("Content-Type: application/json");
        if (err) {
            res.status(404)
                .send({"status": err});
        } else {
            res.status(200)
                .send({"status": "OK"});
        }
    });
});

// DELETE http://localhost:4001/employees/1
app.delete('/employees/:identityNo', (req, res) => {
    let identityNo = req.params.identityNo;
    Employee.findOneAndDelete({'identityNo': identityNo},
        function (err, employee) {
            res.set("Content-Type: application/json");
            if (employee == null) {
                res.status(404)
                    .send({'status': 'Employee is not found!'});
            } else {
                res.status(200).send(employee);
            }
        });
});

app.put("/employees", (req, res) => {
    let emp = req.body;
    let updatableFields = [
        "fullname", "salary", "photo",
        "fulltime", "iban", "department"
    ];
    let updatedEmp = {};
    for (let field in emp) {
        if (updatableFields.indexOf(field) >= 0) {
            updatedEmp[field] = emp[field];
        }
    }
    console.log()
    Employee.update(
        {'identityNo': emp.identityNo},
        {$set: updatedEmp},
        {upsert: false},
        (err, employee) => {
            res.set("Content-Type: application/json");
            if (err) {
                res.status(404)
                    .send({"status": err});
            } else {
                res.status(200)
                    .send(employee);
            }
        });
});







