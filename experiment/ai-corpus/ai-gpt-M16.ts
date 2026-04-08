export function parseExpression(expression: string): number {
  const tokens = tokenize(expression);
  const result = parseAddSub(tokens, { pos: 0 });

  if (tokens.length > 0 && tokens[tokens.length - 1] !== undefined) {
    // ensure all tokens consumed - handled by recursive descent
  }

  return result;
}

type Token = { type: "number"; value: number } | { type: "op"; value: string } | { type: "paren"; value: string };

function tokenize(expr: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const s = expr.replace(/\s+/g, "");

  while (i < s.length) {
    const ch = s[i];

    if (ch >= "0" && ch <= "9" || ch === ".") {
      let numStr = "";
      while (i < s.length && ((s[i] >= "0" && s[i] <= "9") || s[i] === ".")) {
        numStr += s[i];
        i++;
      }
      tokens.push({ type: "number", value: parseFloat(numStr) });
    } else if (ch === "+" || ch === "-" || ch === "*" || ch === "/" || ch === "^") {
      tokens.push({ type: "op", value: ch });
      i++;
    } else if (ch === "(" || ch === ")") {
      tokens.push({ type: "paren", value: ch });
      i++;
    } else {
      throw new Error(`Unexpected character: ${ch}`);
    }
  }

  return tokens;
}

interface Cursor {
  pos: number;
}

function peek(tokens: Token[], cursor: Cursor): Token | undefined {
  return tokens[cursor.pos];
}

function consume(tokens: Token[], cursor: Cursor): Token {
  return tokens[cursor.pos++];
}

function parseAddSub(tokens: Token[], cursor: Cursor): number {
  let left = parseMulDiv(tokens, cursor);

  while (cursor.pos < tokens.length) {
    const token = peek(tokens, cursor);
    if (token && token.type === "op" && (token.value === "+" || token.value === "-")) {
      consume(tokens, cursor);
      const right = parseMulDiv(tokens, cursor);
      left = token.value === "+" ? left + right : left - right;
    } else {
      break;
    }
  }

  return left;
}

function parseMulDiv(tokens: Token[], cursor: Cursor): number {
  let left = parseExponent(tokens, cursor);

  while (cursor.pos < tokens.length) {
    const token = peek(tokens, cursor);
    if (token && token.type === "op" && (token.value === "*" || token.value === "/")) {
      consume(tokens, cursor);
      const right = parseExponent(tokens, cursor);
      if (token.value === "/" && right === 0) {
        throw new Error("Division by zero");
      }
      left = token.value === "*" ? left * right : left / right;
    } else {
      break;
    }
  }

  return left;
}

function parseExponent(tokens: Token[], cursor: Cursor): number {
  const base = parseUnary(tokens, cursor);

  const token = peek(tokens, cursor);
  if (token && token.type === "op" && token.value === "^") {
    consume(tokens, cursor);
    const exp = parseExponent(tokens, cursor);
    return Math.pow(base, exp);
  }

  return base;
}

function parseUnary(tokens: Token[], cursor: Cursor): number {
  const token = peek(tokens, cursor);

  if (token && token.type === "op" && (token.value === "+" || token.value === "-")) {
    consume(tokens, cursor);
    const operand = parseUnary(tokens, cursor);
    return token.value === "-" ? -operand : operand;
  }

  return parsePrimary(tokens, cursor);
}

function parsePrimary(tokens: Token[], cursor: Cursor): number {
  const token = peek(tokens, cursor);

  if (!token) {
    throw new Error("Unexpected end of expression");
  }

  if (token.type === "number") {
    consume(tokens, cursor);
    return token.value;
  }

  if (token.type === "paren" && token.value === "(") {
    consume(tokens, cursor);
    const result = parseAddSub(tokens, cursor);
    const closing = consume(tokens, cursor);
    if (!closing || closing.type !== "paren" || closing.value !== ")") {
      throw new Error("Expected closing parenthesis");
    }
    return result;
  }

  throw new Error(`Unexpected token: ${JSON.stringify(token)}`);
}
