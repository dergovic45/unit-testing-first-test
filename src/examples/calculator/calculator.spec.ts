import { Calculator } from "./calculator";

describe("Calculator", () => {
  it("should add two numbers", () => {
    const calculator = new Calculator();
    expect(calculator.calculate("5+5")).toEqual(10);
  });

  it('should subtract two numbers', () => {
    const calc = new Calculator();
    expect(calc.calculate("1-3")).toEqual(-2);
  });
});
