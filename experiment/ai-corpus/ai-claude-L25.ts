export function permutations(input: string): string[] {
  if (input.length === 0) {
    return [""];
  }

  const chars = input.split("").sort();
  const used = new Array(chars.length).fill(false);
  const result: string[] = [];

  const backtrack = (path: string[]): void => {
    if (path.length === chars.length) {
      result.push(path.join(""));
      return;
    }

    for (let i = 0; i < chars.length; i += 1) {
      if (used[i]) {
        continue;
      }

      if (i > 0 && chars[i] === chars[i - 1] && !used[i - 1]) {
        continue;
      }

      used[i] = true;
      path.push(chars[i]);
      backtrack(path);
      path.pop();
      used[i] = false;
    }
  };

  backtrack([]);
  return result;
}
