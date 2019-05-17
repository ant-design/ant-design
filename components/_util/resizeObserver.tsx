import * as React from 'react';
import { findDOMNode } from 'react-dom';
import ResizeObserver from 'resize-observer-polyfill';

type DomElement = Element | null;

interface ResizeObserverProps {
  children?: React.ReactNode;
  disabled?: boolean;
  onResize?: () => void;
}

class ReactResizeObserver extends React.Component<ResizeObserverProps, {}> {
  resizeObserver: ResizeObserver | null = null;

  componentDidMount() {
    this.onComponentUpdated();
  }

  componentDidUpdate() {
    this.onComponentUpdated();
  }

  componentWillUnmount() {
    this.destroyObserver();
  }

  onComponentUpdated() {
    const { disabled } = this.props;
    const element = findDOMNode(this) as DomElement;
    if (!this.resizeObserver && !disabled && element) {
      // Add resize observer
      this.resizeObserver = new ResizeObserver(this.onResize);
      this.resizeObserver.observe(element);
    } else if (disabled) {
      // Remove resize observer
      this.destroyObserver();
    }
  }

  onResize = () => {
    const { onResize } = this.props;
    if (onResize) {
      onResize();
    }
  };

  destroyObserver() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  render() {
    const { children = null } = this.props;
    return children;
  }
}

export default ReactResizeObserver;
