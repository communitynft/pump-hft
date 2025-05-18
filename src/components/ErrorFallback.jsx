import React from 'react';

export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            Something went wrong
          </h3>
          <div className="mt-2 text-sm text-gray-500">
            <p>We&apos;re sorry, but an unexpected error occurred.</p>
            <details className="mt-4 p-4 bg-gray-50 rounded-md">
              <summary className="text-sm font-medium text-gray-700 cursor-pointer">
                Error details
              </summary>
              <pre className="mt-2 text-xs text-red-600 overflow-auto max-h-40 p-2 bg-white rounded">
                {error?.message || 'Unknown error'}
              </pre>
            </details>
          </div>
          <div className="mt-6">
            <button
              type="button"
              onClick={resetErrorBoundary}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Try again
            </button>
            <a
              href="/"
              className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Go back home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
