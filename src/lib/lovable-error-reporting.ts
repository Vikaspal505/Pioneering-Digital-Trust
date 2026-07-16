type ErrorOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

/**
 * Reports an application error to the configured error tracking system (if any).
 * In development, it simply logs to the console.
 */
export function reportError(
  error: unknown,
  context: Record<string, unknown> = {},
  options: ErrorOptions = {},
) {
  if (typeof window === "undefined") return;

  const payload = {
    source: "react_error_boundary",
    route: window.location.pathname,
    ...context,
  };

  // Hook into any globally registered error handler (e.g. Sentry, DataDog).
  const handler = (
    window as unknown as { __errorHandler?: { captureException?: (e: unknown, ctx: unknown, opts: unknown) => void } }
  ).__errorHandler;

  if (handler?.captureException) {
    handler.captureException(error, payload, {
      mechanism: options.mechanism ?? "react_error_boundary",
      handled: options.handled ?? false,
      severity: options.severity ?? "error",
    });
  } else {
    console.error("[reportError]", error, payload);
  }
}

/** @deprecated Use `reportError` instead. Kept for backwards-compat. */
export const reportLovableError = reportError;
