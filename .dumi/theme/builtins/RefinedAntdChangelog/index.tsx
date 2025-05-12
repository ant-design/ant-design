import * as React from 'react';
import { BugOutlined, LinkOutlined } from '@ant-design/icons';
import { Button, Flex, Popover, theme } from 'antd';
import { createStyles } from 'antd-style';
import dayjs, { Dayjs } from 'dayjs';

import useLocale from '../../../hooks/useLocale';
import { matchDeprecated } from '../../utils';

interface RefinedAntdChangelogProps {
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
    deprecatedTitle: '🚨 该版本存在严重缺陷，请停止使用~',
  },
  en: {
    deprecatedTitle: '🚨 This version has serious defects, please stop using it~',
  },
};

const useStyle = createStyles(({ token, css }) => ({
  container: css`
    margin-block: ${token.margin}px;
    padding: ${token.padding}px;
    background: ${token.colorBgContainer};
    border: 2px solid transparent;
    border-radius: ${token.borderRadius}px;

    h2 {
      line-height: ${token.lineHeight} !important;
      margin: 0 !important;
    }
  `,
  isDeprecated: css`
    background-color: ${token.colorErrorBg};
    border-color: ${token.colorErrorBorder};

    h2 {
      color: ${token.colorError} !important;
      text-decoration: line-through;
    }
  `,
}));

function RefinedAntdChangelog(props: React.PropsWithChildren<RefinedAntdChangelogProps>) {
  const { version, date, children } = props;

  const { styles, cx } = useStyle();

  const memoizedValue = React.useMemo(() => {
    const realVersion = version || '0.0.0';
    const bugVersionInfo = matchDeprecated(realVersion);
    return {
      version: realVersion,
      isDeprecated: bugVersionInfo?.match === version,
      reason: bugVersionInfo?.reason,
      date: date ? dayjs(date) : undefined,
    };
  }, [version, date]);

  return (
    <ChangelogContext.Provider value={memoizedValue}>
      <div className={cx(styles.container, { [styles.isDeprecated]: memoizedValue.isDeprecated })}>
        {children}
      </div>
    </ChangelogContext.Provider>
  );
}

function Version({ children }: React.PropsWithChildren) {
  const { isDeprecated, reason } = React.useContext(ChangelogContext);
  const { token } = theme.useToken();
  const [locale] = useLocale(locales);

  if (!isDeprecated) return children;

  const reasonContent = (
    <Flex vertical>
      {reason?.map((item, index) => (
        <Button
          key={index}
          type="link"
          target="_blank"
          rel="noreferrer"
          href={item}
          icon={<LinkOutlined />}
        >
          {item}
        </Button>
      ))}
    </Flex>
  );

  return (
    <Flex align="center" gap="middle">
      {children}
      <Popover placement="rightTop" title={locale.deprecatedTitle} content={reasonContent}>
        <BugOutlined
          style={{
            fontSize: token.fontSizeHeading4,
            color: token.colorErrorText,
          }}
        />
      </Popover>
    </Flex>
  );
}
function Date(props: React.PropsWithChildren) {
  return props.children;
}

function Details(props: React.PropsWithChildren) {
  return props.children;
}

export default Object.assign(RefinedAntdChangelog, {
  Version,
  Date,
  Details,
});
