// Calculator
export class Calculator {
  calculate(inputValue: string): number {
    const expression = /[+\-*\/]/;
    const numbers = inputValue.split(expression);

    const numberA = parseInt(numbers[0]);
    const numberB = parseInt(numbers[1]);

    const operation = inputValue.match(expression);

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
  }

  private add(numberA: number, numberB: number): number {
    return numberA + numberB;
  }

  private subtract(numberA: number, numberB: number): number {
    return numberA - numberB;
  }

  private multiply(numberA: number, numberB: number): number {
    return numberA * numberB;
  }

  private divide(numberA: number, numberB: number): number {
    if (numberB === 0) {
      throw new Error("Cannot divide by zero!");
    }

    return numberA / numberB;
  }
}

const calculator = new Calculator();
console.log("Calculator result", calculator.calculate("5+5"));
