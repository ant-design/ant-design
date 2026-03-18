import * as React from 'react';
import { createStyles, css } from 'antd-style';
import { clsx } from 'clsx';

const useStyle = createStyles(({ cssVar, cx }) => {
  const duration = cssVar.motionDurationSlow;

  const marker = css({
    '--mark-border-size': '1px',
    position: 'absolute',
    border: `var(--mark-border-size) solid ${cssVar.colorWarning}`,
    boxSizing: 'border-box',
    zIndex: 999999,
    pointerEvents: 'none',
    left: 'calc(var(--rect-left) * 1px - var(--mark-border-size))',
    top: 'calc(var(--rect-top) * 1px - var(--mark-border-size))',
    width: 'calc(var(--rect-width) * 1px + var(--mark-border-size) * 2)',
    height: 'calc(var(--rect-height) * 1px + var(--mark-border-size) * 2)',
    opacity: 0,
    transition: `all ${duration} ease`,
  });

  const markerActive = css({
    [`&.${cx(marker)}`]: {
      opacity: 0.875,
    },
  });

  const markerPrimary = css({
    [`&.${cx(marker)}.${cx(markerActive)}`]: {
      '--mark-border-size': '2px',
      opacity: 1,
      boxShadow: '0 0 0 1px #fff',
      zIndex: 1000000,
    },
  });

  return {
    marker,
    markerActive,
    markerPrimary,
  };
});

export interface MarkerProps {
  rect: {
    left: number;
    top: number;
    width: number;
    height: number;
    visible: boolean;
  };
  primary?: boolean;
}

const Marker = React.memo<MarkerProps>((props) => {
  const { styles } = useStyle();

  const { rect, primary, ...restProps } = props;

  const rectRef = React.useRef(rect);
  if (rect.visible) {
    rectRef.current = rect;
  }

  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    setVisible(rect.visible);
  }, [rect.visible]);

  const mergedRect = rectRef.current;

  return (
    <div
      className={clsx(
        styles.marker,
        visible && styles.markerActive,
        primary && styles.markerPrimary,
      )}
      style={
        {
          '--rect-left': mergedRect.left,
          '--rect-top': mergedRect.top,
          '--rect-width': mergedRect.width,
          '--rect-height': mergedRect.height,
        } as React.CSSProperties
      }
      {...restProps}
    />
  );
});

export default Marker;
