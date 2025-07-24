import React, { Component } from 'react';
import type { ReactNode } from 'react';
import { toast } from 'react-toastify';

interface UiErrorHandlerProps {
  children: ReactNode;
}

interface UiErrorHandlerState {
  hasError: boolean;
}

class UiErrorHandler extends Component<UiErrorHandlerProps, UiErrorHandlerState> {
  constructor(props: UiErrorHandlerProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): UiErrorHandlerState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[UI ERROR]:', error, errorInfo);
    toast.error('Something went wrong in the UI. Please refresh the page.');
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <h1 className="text-3xl font-bold mb-4">😞 Oops!</h1>
          <p className="text-lg">Something went wrong. Please try refreshing the page.</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default UiErrorHandler;
