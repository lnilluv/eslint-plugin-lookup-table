export interface RetryOptions {
  maxAttempts?: number;
  initialDelayMs?: number;
  factor?: number;
  maxDelayMs?: number;
  jitter?: boolean;
  shouldRetry?: (error: unknown, attempt: number) => boolean | Promise<boolean>;
  onRetry?: (error: unknown, attempt: number, delayMs: number) => void | Promise<void>;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function retry<T>(fn: () => Promise<T>, options: RetryOptions = {}): Promise<T> {
  const maxAttempts = options.maxAttempts ?? 3;
  const initialDelayMs = options.initialDelayMs ?? 200;
  const factor = options.factor ?? 2;
  const maxDelayMs = options.maxDelayMs ?? 10_000;
  const jitter = options.jitter ?? false;

  if (maxAttempts < 1) {
    throw new Error("maxAttempts must be at least 1");
  }

  let attempt = 0;

  while (attempt < maxAttempts) {
    attempt += 1;

    try {
      return await fn();
    } catch (error) {
      if (attempt >= maxAttempts) {
        throw error;
      }

      const shouldContinue = options.shouldRetry ? await options.shouldRetry(error, attempt) : true;
      if (!shouldContinue) {
        throw error;
      }

      const exponentialDelay = Math.min(initialDelayMs * factor ** (attempt - 1), maxDelayMs);
      const delayMs = jitter ? Math.floor(Math.random() * (exponentialDelay + 1)) : exponentialDelay;

      if (options.onRetry) {
        await options.onRetry(error, attempt, delayMs);
      }

      await sleep(delayMs);
    }
  }

  throw new Error("Retry failed unexpectedly");
}
