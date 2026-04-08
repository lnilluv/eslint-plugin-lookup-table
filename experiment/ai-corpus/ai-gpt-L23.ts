function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  ...sources: Partial<T>[]
): T {
  const result: Record<string, unknown> = { ...target };

  for (const source of sources) {
    if (!isPlainObject(source)) {
      continue;
    }

    for (const key of Object.keys(source)) {
      const sourceValue = (source as Record<string, unknown>)[key];
      const targetValue = result[key];

      if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
        result[key] = [...targetValue, ...sourceValue];
      } else if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
        result[key] = deepMerge(
          targetValue as Record<string, unknown>,
          sourceValue as Record<string, unknown>
        );
      } else {
        result[key] = sourceValue;
      }
    }
  }

  return result as T;
}
