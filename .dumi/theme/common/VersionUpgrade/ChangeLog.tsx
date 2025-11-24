import React from 'react';
import { FastColor } from '@ant-design/fast-color';
import { createStyles } from 'antd-style';
import debounce from 'lodash/debounce';

import useLocale from '../../../hooks/useLocale';
import EN from './en-US.md';
import CN from './zh-CN.md';

const changeLog = { cn: CN, en: EN };

const useStyle = createStyles(({ css, token }, { isOverflowing }: any) => ({
  container: css`
    max-height: max(62vh, 500px);
    overflow: hidden;
    position: relative;

    ::after {
      opacity: ${isOverflowing ? 1 : 0};
      content: '';
      position: absolute;
      inset-block-end: 0;
      inset-inline-start: 0;
      width: 100%;
      height: 30%;
      pointer-events: none;
      background: linear-gradient(
        to top,
        ${token.colorBgElevated} 0%,
        ${new FastColor(token.colorBgElevated).setA(0.25).toHexString()} 100%
      );
    }

    /* 图片铺满 */
    && img {
      max-width: 100%;
      width: 100%;
    }
  `,
}));

const ChangeLog = () => {
  const [, lang] = useLocale();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [isOverflowing, setIsOverflowing] = React.useState(false);
  const { styles } = useStyle({ isOverflowing });

  const validatedLanguage = Object.keys(changeLog).includes(lang) ? lang : 'en';
  const C = changeLog[validatedLanguage];

  const checkOverflow = React.useMemo(
    () =>
      debounce(() => {
        const hasOverflow =
          containerRef.current?.scrollHeight! > containerRef.current?.clientHeight!;
        setIsOverflowing(hasOverflow);
      }),
    [],
  );

  // 检测溢出状态
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    checkOverflow();

    // eslint-disable-next-line compat/compat
    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(container);

    return function cleanup() {
      resizeObserver.disconnect();
      checkOverflow.cancel();
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <C />
    </div>
  );
};

export default ChangeLog;
