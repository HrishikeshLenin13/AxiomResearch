import type { IncomingMessage, ServerResponse } from "node:http";
export function createVolunteerAccessMiddleware(
  env?: Record<string, string | undefined>,
): (request: IncomingMessage, response: ServerResponse, next: () => void) => void;
