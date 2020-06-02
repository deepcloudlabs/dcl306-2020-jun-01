export default class Customer {
    constructor(identity, fullname, email, gender) {
        this.identity = identity;
        this.fullname = fullname;
        this.email = email;
        this.gender = gender;
        // constructor
        this.sendMessage = this.sendMessage.bind(this);
        // no need to bind lambda expression to this!
        // this.sendLambdaMessage = this.sendLambdaMessage.bind(this);
    }

    sendMessage(body) {
        console.log(`Sending email to ${this.email} with body ${body}`);
    }

    sendLambdaMessage = (body) => {

    }
}