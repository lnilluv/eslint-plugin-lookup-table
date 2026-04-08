export type Comparator<T> = (a: T, b: T) => number;

export function binarySearch<T>(
  sortedArray: T[],
  target: T,
  comparator: Comparator<T>
): number {
  let low = 0;
  let high = sortedArray.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const cmp = comparator(sortedArray[mid], target);

    if (cmp === 0) {
      return mid;
    } else if (cmp < 0) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1;
}
