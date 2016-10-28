import React from 'react';


export interface AnchorLinkProps {
  href: string;
  onClick: (href: string) => {};
  active: boolean;
}

export default class AnchorLink extends React.Component<AnchorLinkProps, any> {
  onClick = () => {
    if (this.props.href) {
      this.props.onClick(this.props.href);
    }
  }
  render() {
    return <div onClick={this.onClick}>
      {this.props.active ? 'active':null } {this.props.children}
    </div>;
  }
}