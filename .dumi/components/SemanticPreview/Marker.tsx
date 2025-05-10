import * as React from 'react';
import { createStyles, css } from 'antd-style';
import classNames from 'classnames';

const MARK_BORDER_SIZE = 2;

const useStyle = createStyles(({ token, cx }) => {
  const marker = css`
    position: absolute;
    border: ${MARK_BORDER_SIZE}px solid ${token.colorWarning};
    box-sizing: border-box;
    z-index: 999999;
    box-shadow: 0 0 0 1px #fff;
    pointer-events: none;
    left: calc(var(--rect-left) * 1px - ${MARK_BORDER_SIZE}px);
    top: calc(var(--rect-top) * 1px - ${MARK_BORDER_SIZE}px);
    width: calc(var(--rect-width) * 1px + ${MARK_BORDER_SIZE * 2}px);
    height: calc(var(--rect-height) * 1px + ${MARK_BORDER_SIZE * 2}px);

    opacity: 0;
    transition: none;
  `;

  const markerActive = css`
    &.${cx(marker)} {
      opacity: 1;
      transition: opacity ${token.motionDurationSlow} ease;
    }
  `;

  const markerMotion = css`
    &.${cx(marker)}.${cx(markerActive)} {
      transition: all ${token.motionDurationSlow} ease;
    }
  `;

  return {
    marker,
    markerActive,
    markerMotion,
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
}

const Marker = React.memo((props: MarkerProps) => {
  const { styles } = useStyle();

  const { rect } = props;

  const [renderKey, setRenderKey] = React.useState(0);
  React.useLayoutEffect(() => {
    if (!rect.visible) {
      setRenderKey((i) => i + 1);
    }
  }, [rect.visible]);

  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    setVisible(rect.visible);
  }, [rect.visible]);

  const [motion, setMotion] = React.useState(false);
  React.useEffect(() => {
    setMotion(visible);
  }, [visible]);

  return (
    <div
      key={renderKey}
      className={classNames(
        styles.marker,
        visible && styles.markerActive,
        motion && styles.markerMotion,
      )}
      style={
        {
          '--rect-left': rect.left,
          '--rect-top': rect.top,
          '--rect-width': rect.width,
          '--rect-height': rect.height,
        } as any
      }
    />
  );
});

export default Marker;
