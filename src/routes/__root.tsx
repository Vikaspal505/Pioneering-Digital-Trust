import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { reportError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cyber px-4 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-50 pointer-events-none" />
      <div className="max-w-md text-center relative z-10">
        <div className="text-cyber-cyan font-mono text-xs tracking-[0.35em] uppercase mb-4 status-blink">
          ERROR · 0x404
        </div>
        <h1
          className="text-8xl font-bold text-glitch gradient-text-cyan"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          404
        </h1>
        <h2 className="mt-4 text-xl font-semibold" style={{ color: "#E2EAF4" }}>
          Signal Lost
        </h2>
        <p className="mt-2 text-sm" style={{ color: "rgba(226,234,244,0.55)" }}>
          The requested node doesn't exist in this network topology.
        </p>
        <div className="mt-8 inline-block neon-border-cyan rounded-sm">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-mono tracking-[0.2em] uppercase text-cyber-cyan hover:bg-cyber-cyan hover:text-cyber-bg transition-all"
          >
            Return to Control Room
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-cyber px-4 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-50 pointer-events-none" />
      <div className="max-w-md text-center relative z-10">
        <div
          className="font-mono text-xs tracking-[0.35em] uppercase mb-4 status-blink"
          style={{ color: "#FF003C" }}
        >
          SYSTEM FAULT · CRITICAL
        </div>
        <h1
          className="text-2xl font-semibold tracking-tight p-4 inline-block"
          style={{
            fontFamily: "Orbitron, sans-serif",
            color: "#FF003C",
            border: "1px solid rgba(255,0,60,0.4)",
          }}
        >
          Pipeline Fault Detected
        </h1>
        <p className="mt-4 text-sm font-mono" style={{ color: "rgba(226,234,244,0.55)" }}>
          An unhandled exception was captured. Recovery protocols available.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-mono tracking-[0.18em] uppercase text-white hover:opacity-80 transition-opacity"
            style={{ background: "#FF003C" }}
          >
            Re-Initialize
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-mono tracking-[0.18em] uppercase transition-all"
            style={{
              border: "1px solid #00F5FF",
              color: "#00F5FF",
            }}
          >
            Return Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
