import React from 'react';

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('UI error:', error);
  }

  render() {
    if (this.state.hasError) return <div>Произошла ошибка</div>;
    return this.props.children;
  }
}

export default ErrorBoundary;
