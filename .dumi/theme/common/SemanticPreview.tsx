import React from 'react';
import { InfoCircleOutlined, PushpinOutlined } from '@ant-design/icons';
import { get, set } from '@rc-component/util';
import { Button, Col, ConfigProvider, Flex, Popover, Row, Tag, theme, Typography } from 'antd';
import { createStaticStyles } from 'antd-style';
import { clsx } from 'clsx';
import Prism from 'prismjs';

import Markers from './Markers';

export interface SemanticPreviewInjectionProps {
  classNames?: Record<string, string>;
}

const styles = createStaticStyles(({ css, cssVar }) => ({
  container: css`
    position: relative;
    z-index: 0;
  `,
  colWrap: css`
    border-inline-end: 1px solid ${cssVar.colorBorderSecondary};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${cssVar.paddingMD};
    overflow: hidden;
    position: relative;
    z-index: 0;
  `,
  colWrapPaddingLess: css`
    padding: 0;
  `,
  listWrap: css`
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  `,
  listItem: css`
    cursor: pointer;
    padding: ${cssVar.paddingSM};
    transition: background-color ${cssVar.motionDurationFast} ease;
    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
    &:hover {
      background-color: ${cssVar.controlItemBgHover};
    }
    &:not(:first-of-type) {
      border-top: 1px solid ${cssVar.colorBorderSecondary};
    }
  `,
}));

function getSemanticCells(semanticPath: string) {
  return semanticPath.split('.');
}

function HighlightExample(props: {
  componentName: string;
  semanticName: string;
  itemsAPI?: string;
}) {
  const { componentName, semanticName, itemsAPI } = props;

  const highlightCode = React.useMemo(() => {
    const classNames = set({}, getSemanticCells(semanticName), `my-classname`);
    const styles = set({}, getSemanticCells(semanticName), { color: 'red' });

    function format(obj: object, offset = 1) {
      const str = JSON.stringify(obj, null, 2);
      return (
        str
          // Add space
          .split('\n')
          .map((line) => `${'  '.repeat(offset)}${line}`)
          .join('\n')
          .trim()
          // Replace quotes
          .replace(/"/g, "'")
          // Remove key quotes
          .replace(/'([^']+)':/g, '$1:')
      );
    }

    let code: string;

    if (itemsAPI) {
      // itemsAPI with array
      code = `
<${componentName}
  ${itemsAPI}={[{
    classNames: ${format(classNames, 2)},
    styles: ${format(styles, 2)},
  }]}
/>`.trim();
    } else {
      // itemsAPI is not provided
      code = `
<${componentName}
  classNames={${format(classNames)}}
  styles={${format(styles)}}
/>`.trim();
    }

    return Prism.highlight(code, Prism.languages.javascript, 'jsx');
  }, [componentName, itemsAPI, semanticName]);

  return (
    // biome-ignore lint: lint/security/noDangerouslySetInnerHtml
    <div dangerouslySetInnerHTML={{ __html: highlightCode }} />
  );
}

const getMarkClassName = (semanticKey: string) =>
  `semantic-mark-${semanticKey}`.replace(/\./g, '-');

export interface SemanticPreviewProps {
  componentName: string;
  semantics: { name: string; desc: string; version?: string }[];
  itemsAPI?: string;
  children: React.ReactElement<any>;
  height?: number;
  padding?: false;
  style?: React.CSSProperties;
  motion?: boolean;
}

const SemanticPreview: React.FC<SemanticPreviewProps> = (props) => {
  const {
    semantics = [],
    children,
    height,
    padding,
    style,
    componentName = 'Component',
    itemsAPI,
    motion = false,
  } = props;
  const { token } = theme.useToken();

  const semanticClassNames = React.useMemo<Record<string, string>>(() => {
    let classNames: Record<string, string> = {};

    semantics.forEach((semantic) => {
      const pathCell = getSemanticCells(semantic.name);
      classNames = set(classNames, pathCell, getMarkClassName(semantic.name));
    });

    return classNames;
  }, [semantics]);

  // ======================== Hover =========================
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [pinSemantic, setPinSemantic] = React.useState<string | null>(null);
  const [hoverSemantic, setHoverSemantic] = React.useState<string | null>(null);

  const mergedSemantic = pinSemantic || hoverSemantic;

  const hoveredSemanticClassNames = React.useMemo(() => {
    if (!mergedSemantic) {
      return semanticClassNames;
    }

    const hoverCell = getSemanticCells(mergedSemantic);
    const clone = set(
      semanticClassNames,
      hoverCell,
      clsx(get(semanticClassNames, hoverCell), getMarkClassName('active')),
    );

    return clone;
  }, [semanticClassNames, mergedSemantic]);

  // ======================== Render ========================
  const cloneNode = React.cloneElement<SemanticPreviewInjectionProps>(children, {
    classNames: hoveredSemanticClassNames,
  });

  return (
    <div className={clsx(styles.container)} ref={containerRef}>
      <Row style={{ minHeight: height }}>
        <Col
          span={16}
          className={clsx(styles.colWrap, padding === false && styles.colWrapPaddingLess)}
          style={style}
        >
          <ConfigProvider theme={{ token: { motion } }}>{cloneNode}</ConfigProvider>
        </Col>
        <Col span={8}>
          <ul className={clsx(styles.listWrap)}>
            {semantics.map<React.ReactNode>((semantic) => (
              <li
                key={semantic.name}
                className={clsx(styles.listItem)}
                onMouseEnter={() => setHoverSemantic(semantic.name)}
                onMouseLeave={() => setHoverSemantic(null)}
              >
                <Flex vertical gap="small">
                  <Flex gap="small" align="center" justify="space-between">
                    {/* Title + Version */}
                    <Flex gap="small" align="center">
                      <Typography.Title level={5} style={{ margin: 0 }}>
                        {semantic.name}
                      </Typography.Title>
                      {semantic.version && <Tag color="blue">{semantic.version}</Tag>}
                    </Flex>

                    {/* Pin + Sample */}
                    <Flex gap="small" align="center">
                      <Button
                        aria-hidden="true"
                        size="small"
                        variant={pinSemantic === semantic.name ? 'solid' : 'text'}
                        color={pinSemantic === semantic.name ? 'primary' : 'default'}
                        icon={<PushpinOutlined />}
                        onClick={() => {
                          setPinSemantic((prev) => (prev === semantic.name ? null : semantic.name));
                        }}
                      />
                      <Popover
                        content={
                          <Typography style={{ fontSize: 12, minWidth: 300 }}>
                            <pre dir="ltr">
                              <code dir="ltr">
                                <HighlightExample
                                  componentName={componentName}
                                  semanticName={semantic.name}
                                  itemsAPI={itemsAPI}
                                />
                              </code>
                            </pre>
                          </Typography>
                        }
                      >
                        <Button
                          aria-hidden="true"
                          size="small"
                          type="text"
                          icon={<InfoCircleOutlined />}
                        />
                      </Popover>
                    </Flex>
                  </Flex>
                  <Typography.Paragraph style={{ margin: 0, fontSize: token.fontSizeSM }}>
                    {semantic.desc}
                  </Typography.Paragraph>
                </Flex>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
      <Markers
        containerRef={containerRef}
        targetClassName={mergedSemantic ? getMarkClassName(mergedSemantic) : null}
      />
    </div>
  );
};

export default SemanticPreview;
