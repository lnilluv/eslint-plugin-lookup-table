export type NestedArray<T> = Array<T | NestedArray<T>>;

export function flattenDeep<T>(input: NestedArray<T>): T[] {
  const output: T[] = [];

  const flatten = (value: NestedArray<T>): void => {
    for (const item of value) {
      if (Array.isArray(item)) {
        flatten(item);
      } else {
        output.push(item);
      }
    }
  };

  flatten(input);
  return output;
}
