import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    // Optionally, you can reload the page
    // Note: This might be too aggressive depending on your application's needs
    window.location.reload();
  }

  static getDerivedStateFromError(error) {
    // Update state to indicate that an error has occurred
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>Please refresh the page or try again later.</p>
        </div>
      );
    }

    // Render children normally if no error occurred
    return this.props.children;
  }
}

export default ErrorBoundary;
