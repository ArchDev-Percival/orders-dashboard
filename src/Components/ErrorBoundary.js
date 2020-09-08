import React, { Component } from "react";
import { ErrorScreen } from "./IntermediateScreens";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error(
      "The following error was caught by the Error Boundary: ",
      error,
      info
    );
  }
  render() {
    if (this.state.hasError) {
      return <ErrorScreen />;
    }
    return this.props.children;
  }
}
