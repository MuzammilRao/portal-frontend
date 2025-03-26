import React from 'react';
import { Heading } from '@chakra-ui/react';
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Heading as="h1" mt="2rem">
          Oops! Something went wrong.
        </Heading>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
