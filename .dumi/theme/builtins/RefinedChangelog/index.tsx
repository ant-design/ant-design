import * as React from 'react';
import { BugOutlined, LinkOutlined } from '@ant-design/icons';
import { Button, Flex, Popover, theme } from 'antd';
import { FastColor } from '@ant-design/fast-color';
import { createStyles } from 'antd-style';
import dayjs, { Dayjs } from 'dayjs';

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

const bgText = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTMwNCAyODBoNTZjNC40IDAgOC0zLjYgOC04IDAtMjguMyA1LjktNTMuMiAxNy4xLTczLjUgMTAuNi0xOS40IDI2LTM0LjggNDUuNC00NS40QzQ1MC45IDE0MiA0NzUuNyAxMzYgNTA0IDEzNmgxNmMyOC4zIDAgNTMuMiA1LjkgNzMuNSAxNy4xIDE5LjQgMTAuNiAzNC44IDI2IDQ1LjQgNDUuNEM2NTAgMjE4LjkgNjU2IDI0My43IDY1NiAyNzJjMCA0LjQgMy42IDggOCA4aDU2YzQuNCAwIDgtMy42IDgtOCAwLTQwLTguOC03Ni43LTI1LjktMTA4LjFhMTg0LjMxIDE4NC4zMSAwIDAwLTc0LTc0QzU5Ni43IDcyLjggNTYwIDY0IDUyMCA2NGgtMTZjLTQwIDAtNzYuNyA4LjgtMTA4LjEgMjUuOWExODQuMzEgMTg0LjMxIDAgMDAtNzQgNzRDMzA0LjggMTk1LjMgMjk2IDIzMiAyOTYgMjcyYzAgNC40IDMuNiA4IDggOHoiIC8+PHBhdGggZD0iTTk0MCA1MTJINzkyVjQxMmM3Ni44IDAgMTM5LTYyLjIgMTM5LTEzOSAwLTQuNC0zLjYtOC04LThoLTYwYy00LjQgMC04IDMuNi04IDhhNjMgNjMgMCAwMS02MyA2M0gyMzJhNjMgNjMgMCAwMS02My02M2MwLTQuNC0zLjYtOC04LThoLTYwYy00LjQgMC04IDMuNi04IDggMCA3Ni44IDYyLjIgMTM5IDEzOSAxMzl2MTAwSDg0Yy00LjQgMC04IDMuNi04IDh2NTZjMCA0LjQgMy42IDggOCA4aDE0OHY5NmMwIDYuNS4yIDEzIC43IDE5LjNDMTY0LjEgNzI4LjYgMTE2IDc5Ni43IDExNiA4NzZjMCA0LjQgMy42IDggOCA4aDU2YzQuNCAwIDgtMy42IDgtOCAwLTQ0LjIgMjMuOS04Mi45IDU5LjYtMTAzLjdhMjczIDI3MyAwIDAwMjIuNyA0OWMyNC4zIDQxLjUgNTkgNzYuMiAxMDAuNSAxMDAuNVM0NjAuNSA5NjAgNTEyIDk2MHM5OS44LTEzLjkgMTQxLjMtMzguMmEyODEuMzggMjgxLjM4IDAgMDAxMjMuMi0xNDkuNUExMjAgMTIwIDAgMDE4MzYgODc2YzAgNC40IDMuNiA4IDggOGg1NmM0LjQgMCA4LTMuNiA4LTggMC03OS4zLTQ4LjEtMTQ3LjQtMTE2LjctMTc2LjcuNC02LjQuNy0xMi44LjctMTkuM3YtOTZoMTQ4YzQuNCAwIDgtMy42IDgtOHYtNTZjMC00LjQtMy42LTgtOC04ek03MTYgNjgwYzAgMzYuOC05LjcgNzItMjcuOCAxMDIuOS0xNy43IDMwLjMtNDMgNTUuNi03My4zIDczLjNDNTg0IDg3NC4zIDU0OC44IDg4NCA1MTIgODg0cy03Mi05LjctMTAyLjktMjcuOGMtMzAuMy0xNy43LTU1LjYtNDMtNzMuMy03My4zQTIwMi43NSAyMDIuNzUgMCAwMTMwOCA2ODBWNDEyaDQwOHYyNjh6IiAvPjwvc3ZnPg==`;

const ChangelogContext = React.createContext<ContextProps>({
  version: '0.0.0',
});

const locales = {
  cn: {
    deprecatedTitle: '🚨 该版本存在严重缺陷，请停止使用。',
  },
  en: {
    deprecatedTitle: '🚨 This version has serious defects, please stop using it.',
  },
};

const useStyle = createStyles(({ token, css }) => ({
  container: css`
    margin-block: ${token.margin}px;
    padding: ${token.padding}px;
    background: ${token.colorBgContainer};
    border: 1px solid transparent;
    border-radius: ${token.borderRadius}px;

    h2 {
      line-height: ${token.lineHeight} !important;
      margin: 0 !important;
    }
  `,
  isDeprecated: css`
    /* background-color: ${token.colorErrorBg}; */
    background: ${new FastColor(token.colorErrorBg).setA(0.18).toHexString()};
    border-color: ${token.colorErrorBorder};

    h2 {
      color: ${token.colorError} !important;
      text-decoration: line-through;
    }

    & > ul {
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        pointer-events: none;
        position: absolute;
        inset-inline-end: 0;
        inset-block-start: 0;
        width: 120px;
        height: 120px;
        opacity: .2;
        background: url(${bgText}) no-repeat center center / cover;
      }
    }
  `,
}));

function RefinedChangelog(props: React.PropsWithChildren<RefinedChangelogProps>) {
  const { version, date, children } = props;

  const { styles, cx } = useStyle();

  const memoizedValue = React.useMemo(() => {
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
function DateComp(props: React.PropsWithChildren) {
  return props.children;
}

function Details(props: React.PropsWithChildren) {
  return props.children;
}

export default Object.assign(RefinedChangelog, {
  Version,
  Date: DateComp,
  Details,
});
