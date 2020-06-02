export default class Game {
    level = 3;
    secret = 0;
    tries = 0;
    counter = 100;
    guess = 123;
    moves = [];

    constructor() {
    }

    createDigit = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    createSecret = (level) => {
        let digits = [];
        digits.push(this.createDigit(1, 9));
        level = Number(level);
        while (digits.length < level) {
            let number = this.createDigit(0, 9);
            if (!digits.includes(number))
                digits.push(number);
        }
        let value = 0;
        for (let digit of digits)
            value = 10 * value + digit;
        return value;
    }

};