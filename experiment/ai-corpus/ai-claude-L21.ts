export type Comparator<T> = (a: T, b: T) => number;

export function binarySearch<T>(array: readonly T[], target: T, comparator: Comparator<T>): number {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const comparison = comparator(array[mid], target);

    if (comparison === 0) {
      return mid;
    }

    if (comparison < 0) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}
