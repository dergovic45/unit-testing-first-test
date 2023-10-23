"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var calculator_1 = require("./calculator");
describe("Calculator", function () {
    it("should add two numbers", function () {
        var calculator = new calculator_1.Calculator();
        expect(calculator.calculate("5+5")).toEqual(10);
    });
});
