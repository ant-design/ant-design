import * as React from 'react';
import { findDOMNode } from 'react-dom';
import TransitionEvents from 'css-animation/lib/Event';

let styleForPesudo: HTMLStyleElement | null;

export default class Wave extends React.Component<{insertExtraNode?: boolean}> {
  private instance?: {
    cancel: () => void;
  };

  private extraNode: HTMLDivElement;
  private clickWaveTimeoutId: number;

  isNotGrey(color: string) {
    const match = (color || '').match(/rgba?\((\d*), (\d*), (\d*)(, [\.\d]*)?\)/);
    if (match && match[1] && match[2] && match[3]) {
      return !(match[1] === match[2] && match[2] === match[3]);
    }
    return true;
  }

  onClick = (node: HTMLElement, waveColor: string) => {
    if (!node || node.className.indexOf('-leave') >= 0) {
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
    styleForPesudo = styleForPesudo || document.createElement('style');
    if (waveColor &&
        waveColor !== '#ffffff' &&
        waveColor !== 'rgb(255, 255, 255)' &&
        this.isNotGrey(waveColor) &&
        !/rgba\(\d*, \d*, \d*, 0\)/.test(waveColor) &&  // any transparent rgba color
        waveColor !== 'transparent') {
      extraNode.style.borderColor = waveColor;
      styleForPesudo.innerHTML =
        `[ant-click-animating-without-extra-node]:after { border-color: ${waveColor}; }`;
      if (!document.body.contains(styleForPesudo)) {
        document.body.appendChild(styleForPesudo);
      }
    }
    if (insertExtraNode) {
      node.appendChild(extraNode);
    }
    TransitionEvents.addEndEventListener(node, this.onTransitionEnd);
  }

  bindAnimationEvent = (node: HTMLElement) => {
    if (!node ||
        !node.getAttribute ||
        node.getAttribute('disabled') ||
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
    if (!node || node === this.extraNode) {
      return;
    }
    const { insertExtraNode } = this.props;
    const attributeName = this.getAttributeName();
    node.removeAttribute(attributeName);
    this.removeExtraStyleNode();
    if (insertExtraNode && this.extraNode && node.contains(this.extraNode)) {
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
    if (styleForPesudo) {
      styleForPesudo.innerHTML = '';
    }
  }

  componentDidMount() {
    const node = findDOMNode(this) as HTMLElement;
    if (node.nodeType !== 1) {
      return;
    }
    this.instance = this.bindAnimationEvent(node);
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
