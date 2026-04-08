export type PlainObject = Record<string, unknown>;

function isPlainObject(value: unknown): value is PlainObject {
  if (value === null || typeof value !== "object") {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function cloneValue<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => cloneValue(item)) as T;
  }

  if (isPlainObject(value)) {
    const out: PlainObject = {};
    for (const [key, entry] of Object.entries(value)) {
      out[key] = cloneValue(entry);
    }
    return out as T;
  }

  return value;
}

export function deepMerge<T, U>(target: T, source: U): T & U {
  if (Array.isArray(target) && Array.isArray(source)) {
    return [...target.map((item) => cloneValue(item)), ...source.map((item) => cloneValue(item))] as T & U;
  }

  if (isPlainObject(target) && isPlainObject(source)) {
    const merged: PlainObject = cloneValue(target);

    for (const [key, sourceValue] of Object.entries(source)) {
      if (key in merged) {
        merged[key] = deepMerge(merged[key], sourceValue);
      } else {
        merged[key] = cloneValue(sourceValue);
      }
    }

    return merged as T & U;
  }

  return cloneValue(source) as T & U;
}
