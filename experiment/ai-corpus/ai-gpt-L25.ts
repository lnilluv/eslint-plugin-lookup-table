export function permutations(input: string): string[] {
  const results = new Set<string>();

  function backtrack(chars: string[], current: string[]): void {
    if (chars.length === 0) {
      results.add(current.join(""));
      return;
    }

    for (let i = 0; i < chars.length; i++) {
      const remaining = [...chars.slice(0, i), ...chars.slice(i + 1)];
      current.push(chars[i]);
      backtrack(remaining, current);
      current.pop();
    }
  }

  backtrack(input.split(""), []);

  return Array.from(results);
}
