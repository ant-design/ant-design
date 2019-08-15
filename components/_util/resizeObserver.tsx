import * as React from 'react';
import { findDOMNode } from 'react-dom';
import ResizeObserver from 'resize-observer-polyfill';

type DomElement = Element | null;

interface ResizeObserverProps {
  children?: React.ReactNode;
  disabled?: boolean;
  onResize?: () => void;
}

interface ResizeObserverState {
  height: number;
  width: number;
}

class ReactResizeObserver extends React.Component<ResizeObserverProps, ResizeObserverState> {
  resizeObserver: ResizeObserver | null = null;

  state = {
    width: 0,
    height: 0,
  };

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

  onResize: ResizeObserverCallback = (entries: ResizeObserverEntry[]) => {
    const { onResize } = this.props;

    const { target } = entries[0];

    const { width, height } = target.getBoundingClientRect();

    /**
     * Resize observer trigger when content size changed.
     * In most case we just care about element size,
     * let's use `boundary` instead of `contentRect` here to avoid shaking.
     */
    const fixedWidth = Math.floor(width);
    const fixedHeight = Math.floor(height);

    if (this.state.width !== fixedWidth || this.state.height !== fixedHeight) {
      this.setState({
        width: fixedWidth,
        height: fixedHeight,
      });

      if (onResize) {
        onResize();
      }
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
