"use client";

import React, { useEffect, type ReactNode } from "react";
// import { useRouter } from "next/navigation";

import { Box } from "@/components/global/village-ds";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ErrorBoundary({ children, fallback }: Props) {
  // available if needed
  // const router = useRouter();

  useEffect(() => {
    // Add error event listener for uncaught client errors
    const handleError = (event: ErrorEvent) => {
      console.error("Client error:", event.error);
      // You could send this to your error reporting service
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  return (
    <ErrorBoundaryInner fallback={fallback}>{children}</ErrorBoundaryInner>
  );
}

// Inner error boundary component
class ErrorBoundaryInner extends React.Component<
  Props,
  { error: Error | null }
> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to your error reporting service
    console.error("Component error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ error: null });
  };

  private handleRefresh = () => {
    window.location.reload();
  };

  render() {
    const { error } = this.state;
    const { children, fallback } = this.props;

    if (error) {
      if (fallback) return fallback;

      return (
        <Alert variant="destructive" className="flex flex-col gap-4">
          <Box gap={2} className="items-start">
            <AlertCircle className="mt-1 h-4 w-4 shrink-0" />
            <div className="flex-1">
              <AlertTitle className="mb-2">Something went wrong</AlertTitle>
              <AlertDescription className="text-sm text-red-800">
                {error.message || "An unexpected error occurred"}
              </AlertDescription>
            </div>
          </Box>
          <Box gap={2}>
            <Button onClick={this.handleReset} variant="secondary" size="sm">
              Try again
            </Button>
            <Button onClick={this.handleRefresh} variant="outline" size="sm">
              Refresh page
            </Button>
          </Box>
        </Alert>
      );
    }

    return children;
  }
}
