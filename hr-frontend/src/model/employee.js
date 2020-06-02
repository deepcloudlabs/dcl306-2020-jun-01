import {Config} from "../utility/utility";

export default class EmployeeModel {
    identityNo = "41444357350";
    fullname = "Jack Bauer";
    iban = "TR260006243754876499298183"
    photo =	Config.NO_IMAGE;
    birthYear = 1956;
    salary = 100000;
    department = "SALES";
    fulltime = true;

    constructor(identityNo = "41444357350" ,fullname = "Jack Bauer",iban = "TR260006243754876499298183") {
        this.identityNo = identityNo;
        this.fullname = fullname;
        this.iban = iban;
    }
}