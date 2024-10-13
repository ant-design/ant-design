import type { ComponentProps, FC } from 'react';
import React from 'react';
import { createStyles } from 'antd-style';
import SourceCodeEditor from 'dumi/theme-default/slots/SourceCodeEditor';

import LiveError from '../slots/LiveError';

const useStyle = createStyles(({ token, css }) => {
  const { colorBgContainer } = token;
  return {
    editor: css`
      // override dumi editor styles
      .dumi-default-source-code-editor {
        .dumi-default-source-code {
          background: ${colorBgContainer};
          &-scroll-container {
            scrollbar-width: thin;
            scrollbar-gutter: stable;
          }
        }
        .dumi-default-source-code > pre,
        .dumi-default-source-code-scroll-content > pre,
        .dumi-default-source-code-editor-textarea {
          padding: ${token.paddingSM}px ${token.padding}px;
        }

        .dumi-default-source-code > pre,
        .dumi-default-source-code-scroll-content > pre {
          font-size: ${token.fontSize}px;
          line-height: 2;
          font-family: 'Lucida Console', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
        }

        // disable dumi default copy button
        .dumi-default-source-code-copy {
          display: none;
        }

        &::after {
          border-radius: 0 !important;
        }

        &:hover:not(:focus-within) {
          &::after {
            box-shadow: 0 0 0 1px ${token.colorPrimaryBorderHover} inset;
          }
        }
      }
    `,
  };
});

const LiveCode: FC<
  {
    error: Error | null;
  } & Pick<ComponentProps<typeof SourceCodeEditor>, 'lang' | 'initialValue' | 'onChange'>
> = (props) => {
  const { styles } = useStyle();
  return (
    <div className={styles.editor}>
      <SourceCodeEditor
        lang={props.lang}
        initialValue={props.initialValue}
        onChange={props.onChange}
      />
      <LiveError error={props.error} />
    </div>
  );
};

export default LiveCode;
