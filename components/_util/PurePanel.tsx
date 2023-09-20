import useMergedState from 'rc-util/lib/hooks/useMergedState';
import * as React from 'react';
import ConfigProvider, { ConfigContext } from '../config-provider';

export function withPureRenderTheme<T extends React.FC>(Component: T) {
  return function PureRenderThemeComponent(props: any) {
    return (
      <ConfigProvider
        theme={{
          token: {
            motion: false,
            zIndexPopupBase: 0,
          },
        }}
      >
        <Component {...props} />
      </ConfigProvider>
    );
  } as T;
}

export interface BaseProps {
  prefixCls?: string;
  style?: React.CSSProperties;
}

/* istanbul ignore next */
export default function genPurePanel<ComponentProps extends BaseProps>(
  Component: React.ComponentType<ComponentProps>,
  defaultPrefixCls?: string,
  getDropdownCls?: null | ((prefixCls: string) => string),
  postProps?: (props: ComponentProps) => ComponentProps,
) {
  function PurePanel(props: any) {
    const { prefixCls: customizePrefixCls, style } = props;

    const holderRef = React.useRef<HTMLDivElement>(null);
    const [popupHeight, setPopupHeight] = React.useState(0);
    const [popupWidth, setPopupWidth] = React.useState(0);
    const [open, setOpen] = useMergedState(false, {
      value: props.open ?? props.visible,
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

    let mergedProps: ComponentProps = {
      ...props,
      style: {
        ...style,
        margin: 0,
      },
      open,
      visible: open,
      getPopupContainer: () => holderRef.current!,
    };

    if (postProps) {
      mergedProps = postProps(mergedProps);
    }

    return (
      <div
        ref={holderRef}
        style={{
          paddingBottom: popupHeight,
          position: 'relative',
          minWidth: popupWidth,
        }}
      >
        <Component {...mergedProps} />
      </div>
    );
  }

  return withPureRenderTheme(PurePanel);
}
