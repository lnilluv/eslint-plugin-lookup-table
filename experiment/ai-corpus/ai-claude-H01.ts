export type HttpStatusCode = 200 | 201 | 301 | 400 | 401 | 403 | 404 | 500 | 502 | 503;

export interface HttpStatusInfo {
  statusText: string;
  message: string;
  shouldRetry: boolean;
}

const HTTP_STATUS_INFO: Record<HttpStatusCode, HttpStatusInfo> = {
  200: {
    statusText: "OK",
    message: "The request completed successfully.",
    shouldRetry: false,
  },
  201: {
    statusText: "Created",
    message: "A new resource was created successfully.",
    shouldRetry: false,
  },
  301: {
    statusText: "Moved Permanently",
    message: "The resource has moved to a new URL.",
    shouldRetry: false,
  },
  400: {
    statusText: "Bad Request",
    message: "The request is malformed or invalid.",
    shouldRetry: false,
  },
  401: {
    statusText: "Unauthorized",
    message: "Authentication is required or has failed.",
    shouldRetry: false,
  },
  403: {
    statusText: "Forbidden",
    message: "You do not have permission to access this resource.",
    shouldRetry: false,
  },
  404: {
    statusText: "Not Found",
    message: "The requested resource could not be found.",
    shouldRetry: false,
  },
  500: {
    statusText: "Internal Server Error",
    message: "The server encountered an unexpected condition.",
    shouldRetry: true,
  },
  502: {
    statusText: "Bad Gateway",
    message: "The server received an invalid response upstream.",
    shouldRetry: true,
  },
  503: {
    statusText: "Service Unavailable",
    message: "The service is temporarily unavailable.",
    shouldRetry: true,
  },
};

export function getHttpStatusInfo(code: number): HttpStatusInfo {
  if (code in HTTP_STATUS_INFO) {
    return HTTP_STATUS_INFO[code as HttpStatusCode];
  }

  return {
    statusText: "Unknown Status",
    message: "The status code is not in the supported list.",
    shouldRetry: code >= 500,
  };
}
