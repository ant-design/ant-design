import * as React from 'react';

/**
 * Wrap a render function that will get outside render times
 */
export default function wrapRender<T extends React.ComponentType<any>>(component: T): T {
  const Component = component as any;

  const RenderWrapper = React.forwardRef((props: any, ref: any) => {
    const renderTimesRef = React.useRef(0);
    renderTimesRef.current += 1;

    return <Component {...props} ref={ref} _renderTimes={renderTimesRef.current} />;
  });

  return RenderWrapper as any as T;
}
