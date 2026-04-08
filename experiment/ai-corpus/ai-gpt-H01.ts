export interface HttpStatusInfo {
  statusText: string;
  message: string;
  shouldRetry: boolean;
}

export function getHttpStatusInfo(code: number): HttpStatusInfo {
  switch (code) {
    case 200:
      return { statusText: "OK", message: "Request succeeded.", shouldRetry: false };
    case 201:
      return { statusText: "Created", message: "Resource created successfully.", shouldRetry: false };
    case 301:
      return { statusText: "Moved Permanently", message: "Resource has been permanently moved.", shouldRetry: false };
    case 400:
      return { statusText: "Bad Request", message: "The request was malformed or invalid.", shouldRetry: false };
    case 401:
      return { statusText: "Unauthorized", message: "Authentication is required.", shouldRetry: false };
    case 403:
      return { statusText: "Forbidden", message: "You do not have permission to access this resource.", shouldRetry: false };
    case 404:
      return { statusText: "Not Found", message: "The requested resource was not found.", shouldRetry: false };
    case 500:
      return { statusText: "Internal Server Error", message: "An unexpected server error occurred.", shouldRetry: true };
    case 502:
      return { statusText: "Bad Gateway", message: "The server received an invalid response from an upstream server.", shouldRetry: true };
    case 503:
      return { statusText: "Service Unavailable", message: "The service is temporarily unavailable.", shouldRetry: true };
    default:
      return { statusText: "Unknown", message: `Unrecognized status code: ${code}`, shouldRetry: false };
  }
}
