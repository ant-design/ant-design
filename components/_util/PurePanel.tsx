import useMergedState from 'rc-util/lib/hooks/useMergedState';
import * as React from 'react';
import ConfigProvider, { ConfigContext } from '../config-provider';

export interface BaseProps {
  prefixCls?: string;
  style?: React.CSSProperties;
}

/* istanbul ignore next */
export default function genPurePanel<ComponentProps extends BaseProps>(
  Component: any,
  defaultPrefixCls?: string,
  getDropdownCls?: (prefixCls: string) => string,
) {
  return function PurePanel(props: Omit<ComponentProps, 'open' | 'visible'> & { open?: boolean }) {
    const { prefixCls: customizePrefixCls, style } = props;

    const holderRef = React.useRef<HTMLDivElement>(null);
    const [popupHeight, setPopupHeight] = React.useState(0);
    const [popupWidth, setPopupWidth] = React.useState(0);
    const [open, setOpen] = useMergedState(false, {
      value: props.open,
    });

    const { getPrefixCls } = React.useContext(ConfigContext);
    const prefixCls = getPrefixCls(defaultPrefixCls || 'select', customizePrefixCls);

    React.useEffect(() => {
      // We do not care about ssr
      setOpen(true);

      if (typeof ResizeObserver !== 'undefined') {
        const resizeObserver = new ResizeObserver((entries) => {
          const element: HTMLDivElement = entries[0].target as any;
          setPopupHeight(element.offsetHeight + 8);
          setPopupWidth(element.offsetWidth);
        });

        const interval = setInterval(() => {
          const dropdownCls = getDropdownCls
            ? `.${getDropdownCls(prefixCls)}`
            : `.${prefixCls}-dropdown`;
          const popup = holderRef.current?.querySelector(dropdownCls);

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
      <ConfigProvider
        theme={{
          token: {
            motionDurationFast: '0.01s',
            motionDurationMid: '0.01s',
            motionDurationSlow: '0.01s',
          },
        }}
      >
        <div
          ref={holderRef}
          style={{
            paddingBottom: popupHeight,
            position: 'relative',
            width: 'fit-content',
            minWidth: popupWidth,
          }}
        >
          <Component
            {...props}
            style={{
              ...style,
              margin: 0,
            }}
            open={open}
            visible={open}
            getPopupContainer={() => holderRef.current!}
          />
        </div>
      </ConfigProvider>
    );
  } as typeof Component;
}
