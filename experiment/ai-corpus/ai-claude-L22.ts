export interface DebounceOptions {
  leading?: boolean;
}

export type DebouncedAsyncFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => Promise<Awaited<ReturnType<T>>>;

interface PromiseHandlers<R> {
  resolve: (value: R | PromiseLike<R>) => void;
  reject: (reason?: unknown) => void;
}

export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delayMs: number,
  options: DebounceOptions = {}
): DebouncedAsyncFunction<T> {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let latestArgs: Parameters<T> | null = null;
  let pending: Array<PromiseHandlers<Awaited<ReturnType<T>>>> = [];
  const leading = options.leading ?? false;

  const invoke = async (args: Parameters<T>): Promise<void> => {
    const handlers = pending;
    pending = [];

    try {
      const result = await fn(...args);
      for (const { resolve } of handlers) {
        resolve(result as Awaited<ReturnType<T>>);
      }
    } catch (error) {
      for (const { reject } of handlers) {
        reject(error);
      }
    }
  };

  return (...args: Parameters<T>) => {
    latestArgs = args;

    return new Promise<Awaited<ReturnType<T>>>((resolve, reject) => {
      pending.push({ resolve, reject });

      const shouldInvokeLeading = leading && timer === null;

      if (timer !== null) {
        clearTimeout(timer);
      }

      if (shouldInvokeLeading) {
        void invoke(args);
      }

      timer = setTimeout(() => {
        timer = null;

        if (latestArgs && (!leading || pending.length > 0)) {
          void invoke(latestArgs);
        }
      }, delayMs);
    });
  };
}
