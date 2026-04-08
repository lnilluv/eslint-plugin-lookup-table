class ExpressionParser {
  private readonly input: string;
  private index = 0;

  constructor(input: string) {
    this.input = input;
  }

  parse(): number {
    const value = this.parseAddSubtract();
    this.skipWhitespace();

    if (this.index < this.input.length) {
      throw new Error(`Unexpected token at position ${this.index}`);
    }

    return value;
  }

  private parseAddSubtract(): number {
    let value = this.parseMultiplyDivide();

    while (true) {
      this.skipWhitespace();
      const operator = this.peek();

      if (operator !== "+" && operator !== "-") {
        break;
      }

      this.index += 1;
      const rhs = this.parseMultiplyDivide();
      value = operator === "+" ? value + rhs : value - rhs;
    }

    return value;
  }

  private parseMultiplyDivide(): number {
    let value = this.parseUnary();

    while (true) {
      this.skipWhitespace();
      const operator = this.peek();

      if (operator !== "*" && operator !== "/") {
        break;
      }

      this.index += 1;
      const rhs = this.parseUnary();

      if (operator === "*") {
        value *= rhs;
      } else {
        if (rhs === 0) {
          throw new Error("Division by zero");
        }
        value /= rhs;
      }
    }

    return value;
  }

  private parseUnary(): number {
    this.skipWhitespace();
    const operator = this.peek();

    if (operator === "+") {
      this.index += 1;
      return this.parseUnary();
    }

    if (operator === "-") {
      this.index += 1;
      return -this.parseUnary();
    }

    return this.parsePrimary();
  }

  private parsePrimary(): number {
    this.skipWhitespace();

    if (this.peek() === "(") {
      this.index += 1;
      const value = this.parseAddSubtract();
      this.skipWhitespace();

      if (this.peek() !== ")") {
        throw new Error(`Expected ')' at position ${this.index}`);
      }

      this.index += 1;
      return value;
    }

    return this.parseNumber();
  }

  private parseNumber(): number {
    this.skipWhitespace();
    const start = this.index;
    let sawDot = false;

    while (this.index < this.input.length) {
      const char = this.input[this.index];
      if (char >= "0" && char <= "9") {
        this.index += 1;
        continue;
      }
      if (char === "." && !sawDot) {
        sawDot = true;
        this.index += 1;
        continue;
      }
      break;
    }

    if (start === this.index) {
      throw new Error(`Expected number at position ${this.index}`);
    }

    const value = Number(this.input.slice(start, this.index));
    if (!Number.isFinite(value)) {
      throw new Error("Invalid numeric value");
    }

    return value;
  }

  private skipWhitespace(): void {
    while (this.index < this.input.length && /\s/.test(this.input[this.index])) {
      this.index += 1;
    }
  }

  private peek(): string {
    return this.input[this.index] ?? "";
  }
}

export function parseExpression(expression: string): number {
  const parser = new ExpressionParser(expression);
  return parser.parse();
}
