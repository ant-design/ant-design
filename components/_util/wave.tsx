import * as React from 'react';
import { findDOMNode } from 'react-dom';
import TransitionEvents from 'css-animation/lib/Event';

export default class Wave extends React.Component<{insertExtraNode?: boolean}> {
  private instance?: {
    cancel: () => void;
  };

  private extraNode: HTMLDivElement;
  private clickWaveTimeoutId: number;
  private styleForPesudo: HTMLStyleElement | null;

  isNotGrey(color: string) {
    const match = (color || '').match(/rgba?\((\d*), (\d*), (\d*)(, [\.\d]*)?\)/);
    if (match && match[1] && match[2] && match[3]) {
      return !(match[1] === match[2] && match[2] === match[3]);
    }
    return true;
  }

  onClick = (node: HTMLElement, waveColor: string) => {
    if (node.className.indexOf('-leave') >= 0) {
      return;
    }
    const { insertExtraNode } = this.props;
    this.extraNode = document.createElement('div');
    const extraNode = this.extraNode;
    extraNode.className = 'ant-click-animating-node';
    const attributeName = this.getAttributeName();
    node.removeAttribute(attributeName);
    node.setAttribute(attributeName, 'true');
    // Not white or transparnt or grey
    if (waveColor &&
        waveColor !== '#ffffff' &&
        waveColor !== 'rgb(255, 255, 255)' &&
        this.isNotGrey(waveColor) &&
        !/rgba\(\d*, \d*, \d*, 0\)/.test(waveColor) &&  // any transparent rgba color
        waveColor !== 'transparent') {
      extraNode.style.borderColor = waveColor;
      this.styleForPesudo = document.createElement('style');
      this.styleForPesudo.innerHTML =
        `[ant-click-animating-without-extra-node]:after { border-color: ${waveColor}; }`;
      document.body.appendChild(this.styleForPesudo);
    }
    if (insertExtraNode) {
      node.appendChild(extraNode);
    }
    TransitionEvents.addEndEventListener(node, this.onTransitionEnd);
  }

  bindAnimationEvent = (node: HTMLElement) => {
    if (node.getAttribute('disabled') ||
        node.className.indexOf('disabled') >= 0) {
      return;
    }
    const onClick = (e: MouseEvent) => {
      // Fix radio button click twice
      if ((e.target as HTMLElement).tagName === 'INPUT') {
        return;
      }
      this.resetEffect(node);
      // Get wave color from target
      const waveColor =
        getComputedStyle(node).getPropertyValue('border-top-color') || // Firefox Compatible
        getComputedStyle(node).getPropertyValue('border-color') ||
        getComputedStyle(node).getPropertyValue('background-color');
      this.clickWaveTimeoutId = window.setTimeout(() => this.onClick(node, waveColor), 0);
    };
    node.addEventListener('click', onClick, true);
    return {
      cancel: () => {
        node.removeEventListener('click', onClick, true);
      },
    };
  }

  getAttributeName() {
    const { insertExtraNode } = this.props;
    return insertExtraNode ? 'ant-click-animating' : 'ant-click-animating-without-extra-node';
  }

  resetEffect(node: HTMLElement) {
    const { insertExtraNode } = this.props;
    const attributeName = this.getAttributeName();
    node.removeAttribute(attributeName);
    this.removeExtraStyleNode();
    if (insertExtraNode) {
      node.removeChild(this.extraNode);
    }
    TransitionEvents.removeEndEventListener(node, this.onTransitionEnd);
  }

  onTransitionEnd = (e: AnimationEvent) => {
    if (!e || e.animationName !== 'fadeEffect') {
      return;
    }
    this.resetEffect(e.target as HTMLElement);
  }

  removeExtraStyleNode() {
    if (this.styleForPesudo && document.body.contains(this.styleForPesudo)) {
      document.body.removeChild(this.styleForPesudo);
      this.styleForPesudo = null;
    }
  }

  componentDidMount() {
    this.instance = this.bindAnimationEvent(findDOMNode(this) as HTMLElement);
  }

  componentWillUnmount() {
    if (this.instance) {
      this.instance.cancel();
    }
    if (this.clickWaveTimeoutId) {
      clearTimeout(this.clickWaveTimeoutId);
    }
  }

  render() {
    return this.props.children;
  }
}
