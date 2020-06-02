import Customer from "./customer";

export default class GoldCustomer extends Customer {
    constructor(identity, fullname, email, gender, phone) {
        super(identity, fullname, email, gender);
        this.phone = phone;
    }
}

// FilterMapReduce: ES6 -> Array
let customers = [
    new Customer("1", "customer one", "cust1@example.com", "male"),
    new Customer("2", "customer two", "cust2@example.com", "female")
];

// using for-each (external loop)
let names = [];
for (let cust of customers){
    if (cust.gender === "female")
        names.push(cust.fullname);
}
// using filter/map/reduce (internal loop -> filter/map/reduce)
// Model -> View
let fullnames = customers.filter( (customer) => customer.gender=== "female" )
                         .map( (customer) => customer.fullname);
let numbers = [4,8,23,16,15,42];
let sum = numbers.filter( n => n%2 == 0)
                 .map( x => x*x)
                 .reduce((s,a) => s+a, 0)