import React from 'react';
import classnames from 'classnames';

export interface AnchorLinkProps {
  href: string;
  onClick: (href: string) => {};
  active: boolean;
}

export default function AnchorLink(props) {
  const { prefixCls, active, href, children, onClick } = props;
  const cls = classnames({
    [`${prefixCls}-link`]: true,
    [`${prefixCls}-link-active`]: active,
  });

  return <div className={cls} onClick={() => onClick(props.href)} >
      {children}
    </div>;
}