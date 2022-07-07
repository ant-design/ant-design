import * as React from 'react';
import { ConfigContext } from '../config-provider';

export interface BaseProps {
  prefixCls?: string;
  style?: React.CSSProperties;
}

/* istanbul ignore next */
export default function genPurePanel<ComponentProps extends BaseProps>(Component: any) {
  return function PurePanel(props: ComponentProps) {
    const { prefixCls: customizePrefixCls, style } = props;
    const holderRef = React.useRef<HTMLDivElement>(null);
    const [popupHeight, setPopupHeight] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const { getPrefixCls } = React.useContext(ConfigContext);
    const prefixCls = getPrefixCls('select', customizePrefixCls);

    React.useEffect(() => {
      // We do not care about ssr
      setOpen(true);

      if (typeof ResizeObserver !== 'undefined') {
        const resizeObserver = new ResizeObserver(entries => {
          const element: HTMLDivElement = entries[0].target as any;
          setPopupHeight(element.offsetHeight + 8);
        });

        const interval = setInterval(() => {
          const popup = holderRef.current?.querySelector(`.${prefixCls}-dropdown`);

          if (popup) {
            clearInterval(interval);
            resizeObserver.observe(popup);
          }
        }, 10);

        return () => {
          clearInterval(interval);
          resizeObserver.disconnect();
        };
      }
    }, []);

    return (
      <div ref={holderRef} style={{ paddingBottom: popupHeight }}>
        <Component
          {...props}
          style={{
            ...style,
            margin: 0,
          }}
          open={open}
          getPopupContainer={() => holderRef.current!}
        />
      </div>
    );
  } as typeof Component;
}
