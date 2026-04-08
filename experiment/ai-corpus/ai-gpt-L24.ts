type NestedArray<T> = (T | NestedArray<T>)[];

export function flattenDeep<T>(arr: NestedArray<T>): T[] {
  const result: T[] = [];
  const stack: (T | NestedArray<T>)[] = [...arr];

  while (stack.length > 0) {
    const item = stack.pop();
    if (Array.isArray(item)) {
      for (let i = item.length - 1; i >= 0; i--) {
        stack.push(item[i]);
      }
    } else {
      result.push(item as T);
    }
  }

  return result;
}
