import * as React from 'react';
import { createStyles, css } from 'antd-style';
import classNames from 'classnames';

const useStyle = createStyles(({ token, cx }) => {
  const duration = token.motionDurationSlow;

  const marker = css`
    --mark-border-size: 1px;
    position: absolute;
    border: var(--mark-border-size) solid ${token.colorWarning};
    box-sizing: border-box;
    z-index: 999999;
    pointer-events: none;
    left: calc(var(--rect-left) * 1px - var(--mark-border-size));
    top: calc(var(--rect-top) * 1px - var(--mark-border-size));
    width: calc(var(--rect-width) * 1px + var(--mark-border-size) * 2);
    height: calc(var(--rect-height) * 1px + var(--mark-border-size) * 2);

    opacity: 0;
    transition: all ${duration} ease;
  `;

  const markerActive = css`
    &.${cx(marker)} {
      opacity: 0.85;
    }
  `;

  const markerPrimary = css`
    &.${cx(marker)}.${cx(markerActive)} {
      --mark-border-size: 2px;
      opacity: 1;
      box-shadow: 0 0 0 1px #fff;
      z-index: 1000000;
    }
  `;

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

const Marker = React.memo((props: MarkerProps) => {
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
      className={classNames(
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
        } as any
      }
      {...restProps}
    />
  );
});

export default Marker;
