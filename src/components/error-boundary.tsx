import React, { PropsWithChildren } from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

export class ErrorBoundary extends React.Component<
  PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: null | Error }
> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render(): React.ReactNode {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender;
    } else {
      return children;
    }
  }
}
