import * as React from 'react';
import devWarning from '../_util/devWarning';
import Base, { BlockProps } from './Base';

export interface LinkProps
  extends BlockProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'type'> {
  ellipsis?: boolean;
  navigate?: Function;
}

function isModifiedEvent(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

const Link: React.ForwardRefRenderFunction<HTMLElement, LinkProps> = (
  { ellipsis, rel, navigate, onClick, ...restProps },
  ref,
) => {
  devWarning(
    typeof ellipsis !== 'object',
    'Typography.Link',
    '`ellipsis` only supports boolean value.',
  );

  const baseRef = React.useRef<Base>(null);

  React.useImperativeHandle(ref, () => baseRef.current?.contentRef.current!);

  const { target } = restProps;

  const mergedProps = {
    ...restProps,
    rel: rel === undefined && restProps.target === '_blank' ? 'noopener noreferrer' : rel,
    onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      try {
        if (onClick) {
          onClick(event);
        }
      } catch (ex) {
        event.preventDefault();
        throw ex;
      }

      if (
        navigate && // react-router-dom Link
        !event.defaultPrevented && // onClick prevented default
        event.button === 0 && // ignore everything but left clicks
        (!target || target === '_self') && // let browser handle "target=_blank" etc.
        !isModifiedEvent(event) // ignore clicks with modifier keys
      ) {
        event.preventDefault();
        navigate();
      }
    },
  };

  // https://github.com/ant-design/ant-design/issues/26622
  // @ts-ignore
  delete mergedProps.navigate;

  return <Base {...mergedProps} ref={baseRef} ellipsis={!!ellipsis} component="a" />;
};

export default React.forwardRef(Link);
