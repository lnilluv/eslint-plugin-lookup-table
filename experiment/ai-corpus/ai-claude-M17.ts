export interface SessionLike {
  id?: string;
  userId?: string;
  token?: string;
}

export interface RequestLike {
  headers: Record<string, string | string[] | undefined>;
  cookies?: Record<string, string | undefined>;
  session?: SessionLike | null;
}

export interface AuthenticatedRequest extends RequestLike {
  auth?: {
    method: "bearer" | "apiKey" | "session";
    credential: string;
  };
}

export interface ResponseLike {
  status(code: number): ResponseLike;
  json(body: unknown): void;
  end(body?: unknown): void;
}

export type NextFunction = () => void;

export interface AuthMiddlewareOptions {
  validBearerTokens?: Iterable<string>;
  validApiKeys?: Iterable<string>;
  allowSession?: boolean;
}

const DEFAULT_BEARER_TOKENS = new Set(["dev-token", "service-token"]);
const DEFAULT_API_KEYS = new Set(["dev-api-key", "internal-api-key"]);

function firstHeaderValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

function getHeader(headers: RequestLike["headers"], name: string): string | undefined {
  const exact = firstHeaderValue(headers[name]);
  if (exact !== undefined) {
    return exact;
  }

  const lower = name.toLowerCase();
  for (const key of Object.keys(headers)) {
    if (key.toLowerCase() === lower) {
      return firstHeaderValue(headers[key]);
    }
  }

  return undefined;
}

export function authMiddleware(options: AuthMiddlewareOptions = {}) {
  const validBearerTokens = new Set(options.validBearerTokens ?? DEFAULT_BEARER_TOKENS);
  const validApiKeys = new Set(options.validApiKeys ?? DEFAULT_API_KEYS);
  const allowSession = options.allowSession ?? true;

  return (req: AuthenticatedRequest, res: ResponseLike, next: NextFunction): void => {
    const authHeader = getHeader(req.headers, "authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.slice("Bearer ".length).trim();
      if (token && validBearerTokens.has(token)) {
        req.auth = { method: "bearer", credential: token };
        next();
        return;
      }
    }

    const apiKey = getHeader(req.headers, "x-api-key")?.trim();
    if (apiKey && validApiKeys.has(apiKey)) {
      req.auth = { method: "apiKey", credential: apiKey };
      next();
      return;
    }

    if (allowSession) {
      const sessionCookie = req.cookies?.session_id ?? req.cookies?.session;
      const sessionToken = req.session?.token ?? req.session?.id ?? req.session?.userId;
      const sessionCredential = sessionToken ?? sessionCookie;

      if (sessionCredential) {
        req.auth = { method: "session", credential: sessionCredential };
        next();
        return;
      }
    }

    res.status(401).json({ error: "Unauthorized" });
  };
}
