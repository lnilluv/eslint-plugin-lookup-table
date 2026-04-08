export interface Request {
  headers: Record<string, string | string[] | undefined>;
  cookies?: Record<string, string>;
}

export interface Response {
  status(code: number): Response;
  json(body: unknown): void;
}

export type NextFunction = (err?: unknown) => void;

export interface AuthResult {
  authenticated: boolean;
  method: "bearer" | "apikey" | "session" | null;
  userId?: string;
}

export type TokenValidator = (token: string) => Promise<{ valid: boolean; userId?: string }>;
export type ApiKeyValidator = (key: string) => Promise<{ valid: boolean; userId?: string }>;
export type SessionValidator = (sessionId: string) => Promise<{ valid: boolean; userId?: string }>;

export interface AuthMiddlewareOptions {
  validateToken: TokenValidator;
  validateApiKey: ApiKeyValidator;
  validateSession: SessionValidator;
}

function getHeader(req: Request, name: string): string | undefined {
  const value = req.headers[name] ?? req.headers[name.toLowerCase()];
  if (Array.isArray(value)) return value[0];
  return value;
}

export function authMiddleware(options: AuthMiddlewareOptions) {
  const { validateToken, validateApiKey, validateSession } = options;

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authorization = getHeader(req, "Authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
      const token = authorization.slice(7);
      try {
        const result = await validateToken(token);
        if (result.valid) {
          (req as Record<string, unknown>)["auth"] = {
            authenticated: true,
            method: "bearer",
            userId: result.userId,
          } satisfies AuthResult;
          return next();
        }
      } catch {
        return res.status(401).json({ error: "Invalid bearer token" });
      }
    }

    const apiKey = getHeader(req, "X-API-Key");
    if (apiKey) {
      try {
        const result = await validateApiKey(apiKey);
        if (result.valid) {
          (req as Record<string, unknown>)["auth"] = {
            authenticated: true,
            method: "apikey",
            userId: result.userId,
          } satisfies AuthResult;
          return next();
        }
      } catch {
        return res.status(401).json({ error: "Invalid API key" });
      }
    }

    const sessionId = req.cookies?.["session_id"];
    if (sessionId) {
      try {
        const result = await validateSession(sessionId);
        if (result.valid) {
          (req as Record<string, unknown>)["auth"] = {
            authenticated: true,
            method: "session",
            userId: result.userId,
          } satisfies AuthResult;
          return next();
        }
      } catch {
        return res.status(401).json({ error: "Invalid session" });
      }
    }

    return res.status(401).json({ error: "Authentication required" });
  };
}
