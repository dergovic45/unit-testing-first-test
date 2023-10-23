import { Calculator } from "./calculator";

describe("Calculator", () => {
  it("should add two numbers", () => {
    const calculator = new Calculator();
    expect(calculator.calculate("5+5")).toEqual(10);
  });
});
