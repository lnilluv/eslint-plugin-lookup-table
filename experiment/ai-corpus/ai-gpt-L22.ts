export interface DebounceOptions {
  leading?: boolean;
}

export interface DebouncedFunction<T extends (...args: unknown[]) => unknown> {
  (...args: Parameters<T>): Promise<ReturnType<T>>;
  cancel(): void;
  flush(): void;
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
  options: DebounceOptions = {}
): DebouncedFunction<T> {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let pendingResolve: ((value: ReturnType<T>) => void) | null = null;
  let pendingReject: ((reason: unknown) => void) | null = null;
  let latestArgs: Parameters<T> | null = null;
  let leadingInvoked = false;

  const { leading = false } = options;

  function invoke(args: Parameters<T>): void {
    try {
      const result = fn(...args) as ReturnType<T>;
      pendingResolve?.(result);
    } catch (err) {
      pendingReject?.(err);
    } finally {
      pendingResolve = null;
      pendingReject = null;
      latestArgs = null;
      leadingInvoked = false;
    }
  }

  const debounced = function (...args: Parameters<T>): Promise<ReturnType<T>> {
    latestArgs = args;

    return new Promise<ReturnType<T>>((resolve, reject) => {
      pendingResolve = resolve;
      pendingReject = reject;

      if (leading && !leadingInvoked && timer === null) {
        leadingInvoked = true;
        invoke(args);
        timer = setTimeout(() => {
          timer = null;
          leadingInvoked = false;
        }, delay);
        return;
      }

      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        timer = null;
        if (latestArgs) {
          invoke(latestArgs);
        }
      }, delay);
    });
  } as DebouncedFunction<T>;

  debounced.cancel = () => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
    pendingResolve = null;
    pendingReject = null;
    latestArgs = null;
    leadingInvoked = false;
  };

  debounced.flush = () => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
    if (latestArgs) {
      invoke(latestArgs);
    }
  };

  return debounced;
}
