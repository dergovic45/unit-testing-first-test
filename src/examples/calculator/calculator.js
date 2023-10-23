"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculator = void 0;
// Calculator
var Calculator = /** @class */ (function () {
    function Calculator() {
    }
    Calculator.prototype.calculate = function (inputValue) {
        var expression = /[+\-*\/]/;
        var numbers = inputValue.split(expression);
        var numberA = parseInt(numbers[0]);
        var numberB = parseInt(numbers[1]);
        var operation = inputValue.match(expression);
        if (Number.isNaN(numberA) || Number.isNaN(numberB) || !operation) {
            throw new Error("Expression not recognized!");
        }
        switch (operation[0]) {
            case "+":
                return this.add(numberA, numberB);
            case "-":
                return this.subtract(numberA, numberB);
            case "*":
                return this.multiply(numberA, numberB);
            case "/":
                return this.divide(numberA, numberB);
            default:
                throw new Error("Operation not recognized!");
        }
    };
    Calculator.prototype.add = function (numberA, numberB) {
        return numberA + numberB;
    };
    Calculator.prototype.subtract = function (numberA, numberB) {
        return numberA - numberB;
    };
    Calculator.prototype.multiply = function (numberA, numberB) {
        return numberA * numberB;
    };
    Calculator.prototype.divide = function (numberA, numberB) {
        if (numberB === 0) {
            throw new Error("Cannot divide by zero!");
        }
        return numberA / numberB;
    };
    return Calculator;
}());
exports.Calculator = Calculator;
var calculator = new Calculator();
console.log("Calculator result", calculator.calculate("5+5"));
