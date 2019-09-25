import * as React from 'react';

export interface InputElementProps {
  children: React.ReactElement<any>;
}

export default class InputElement extends React.Component<InputElementProps, any> {
  saveRef = (ele: HTMLInputElement) => {
    const { ref: childRef } = this.props.children as any;
    if (typeof childRef === 'function') {
      childRef(ele);
    }
  };

  render() {
    return React.cloneElement(
      this.props.children,
      {
        ...this.props,
        ref: this.saveRef,
      },
      null,
    );
  }
}
