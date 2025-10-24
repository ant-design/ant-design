import * as React from 'react';
import { BugOutlined } from '@ant-design/icons';
import { Button, Flex, Popover, theme } from 'antd';
import { createStyles } from 'antd-style';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

import useLocale from '../../../hooks/useLocale';
import { matchDeprecated } from '../../utils';

interface RefinedChangelogProps {
  version?: string;
  date?: string;
}

interface ContextProps {
  version: string;
  date?: Dayjs;
  isDeprecated?: boolean;
  reason?: string[];
}

const ChangelogContext = React.createContext<ContextProps>({
  version: '0.0.0',
});

const locales = {
  cn: {
    deprecatedTitle: '🚨 该版本存在缺陷, 请升级至下一个新版本',
  },
  en: {
    deprecatedTitle: '🚨 This version has defects, please upgrade to the next version',
  },
};

const useStyle = createStyles(({ token, css }) => ({
  container: css`
    margin-block: ${token.margin}px;
    padding: ${token.padding}px;

    .changelog-version {
      line-height: ${token.lineHeight} !important;
      margin: 0 !important;
    }
  `,
  isDeprecated: css``,
}));

const RefinedChangelog: React.FC<React.PropsWithChildren<RefinedChangelogProps>> = (props) => {
  const { version, date, children } = props;

  const { styles, cx } = useStyle();

  const memoizedValue = React.useMemo<ContextProps>(() => {
    const realVersion = version || '0.0.0';
    const bugVersionInfo = matchDeprecated(realVersion);
    return {
      version: realVersion,
      isDeprecated: !!bugVersionInfo?.match,
      reason: bugVersionInfo?.reason,
      date: date ? dayjs(date) : undefined,
    };
  }, [version, date]);

  return (
    <ChangelogContext value={memoizedValue}>
      <div
        className={cx('refined-changelog', styles.container, {
          [styles.isDeprecated]: memoizedValue.isDeprecated,
        })}
      >
        {children}
      </div>
    </ChangelogContext>
  );
};

const Version: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isDeprecated, reason } = React.use(ChangelogContext);
  const { token } = theme.useToken();
  const [locale] = useLocale(locales);

  if (!isDeprecated) {
    return children;
  }

  const reasonContent = (
    <Flex vertical align="start">
      {reason?.map((item, index) => (
        <Button
          key={index}
          type="link"
          target="_blank"
          rel="noreferrer"
          href={item}
          icon={<BugOutlined />}
        >
          {item}
        </Button>
      ))}
    </Flex>
  );

  return (
    <Flex align="center" gap="small">
      {children}
      <Popover placement="right" title={locale.deprecatedTitle} content={reasonContent}>
        <BugOutlined
          style={{
            lineHeight: token.lineHeight,
            fontSize: token.fontSize,
            color: token.colorErrorText,
          }}
        />
      </Popover>
    </Flex>
  );
};

const DateComp: React.FC<React.PropsWithChildren> = (props) => props.children;

const DetailsComp: React.FC<React.PropsWithChildren<HTMLDivElement>> = (props) => {
  const { children, className } = props;
  return <div className={className}>{children}</div>;
};

export default Object.assign(RefinedChangelog, {
  Version,
  Date: DateComp,
  Details: DetailsComp,
});
