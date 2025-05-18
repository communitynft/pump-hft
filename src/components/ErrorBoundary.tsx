'use client';

import { Component, ErrorInfo, ReactNode, ComponentType } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-6 max-w-md mx-auto mt-10 bg-red-50 text-red-700 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
          <p className="mb-4">
            {this.state.error?.message || 'An unexpected error occurred. Please try again.'}
          </p>
          <button
            onClick={this.resetError}
            className="px-4 py-2 bg-red-100 hover:bg-red-200 rounded-md transition-colors"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export function withErrorBoundary<T extends object>(
  Component: ComponentType<T>,
  Fallback?: ComponentType<{ error: Error | null }>
) {
  return function ErrorBoundaryWrapper(props: T) {
    return (
      <ErrorBoundary 
        fallback={Fallback ? <Fallback error={null} /> : undefined}
      >
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
