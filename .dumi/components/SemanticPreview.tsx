/* eslint-disable react-hooks-extra/no-direct-set-state-in-use-effect */
import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import get from 'rc-util/lib/utils/get';
import set from 'rc-util/lib/utils/set';
import { Col, ConfigProvider, Flex, Popover, Row, Tag, theme, Typography } from 'antd';
import { createStyles, css } from 'antd-style';
import classnames from 'classnames';
import Prism from 'prismjs';

const MARK_BORDER_SIZE = 2;

const useStyle = createStyles(({ token }, markPos: [number, number, number, number]) => ({
  container: css`
    position: relative;
  `,
  colWrap: css`
    border-right: 1px solid ${token.colorBorderSecondary};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${token.paddingMD}px;
    overflow: hidden;
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
    padding: ${token.paddingSM}px;
    transition: background-color ${token.motionDurationFast} ease;
    &:hover {
      background-color: ${token.controlItemBgHover};
    }
    &:not(:first-of-type) {
      border-top: 1px solid ${token.colorBorderSecondary};
    }
  `,
  marker: css`
    position: absolute;
    border: ${MARK_BORDER_SIZE}px solid ${token.colorWarning};
    box-sizing: border-box;
    z-index: 999999;
    box-shadow: 0 0 0 1px #fff;
    pointer-events: none;
    inset-inline-start: ${markPos[0] - MARK_BORDER_SIZE}px;
    top: ${markPos[1] - MARK_BORDER_SIZE}px;
    width: ${markPos[2] + MARK_BORDER_SIZE * 2}px;
    height: ${markPos[3] + MARK_BORDER_SIZE * 2}px;
  `,
  markerActive: css`
    opacity: 1;
  `,
  markerNotActive: css`
    opacity: 0;
  `,
  markerMotion: css`
    transition:
      opacity ${token.motionDurationSlow} ease,
      all ${token.motionDurationSlow} ease;
  `,
  markerNotMotion: css`
    transition: opacity ${token.motionDurationSlow} ease;
  `,
}));

function getSemanticCells(semanticPath: string) {
  return semanticPath.split('.');
}

function HighlightExample(props: { componentName: string; semanticName: string }) {
  const { componentName, semanticName } = props;

  const highlightCode = React.useMemo(() => {
    const classNames = set({}, getSemanticCells(semanticName), `my-classname`);
    const styles = set({}, getSemanticCells(semanticName), { color: 'red' });

    function format(obj: object) {
      const str = JSON.stringify(obj, null, 2);
      return (
        str
          // Add space
          .split('\n')
          .map((line) => `  ${line}`)
          .join('\n')
          .trim()
          // Replace quotes
          .replace(/"/g, "'")
          // Remove key quotes
          .replace(/'([^']+)':/g, '$1:')
      );
    }

    const code = `
<${componentName}
  classNames={${format(classNames)}}
  styles={${format(styles)}}
/>`.trim();

    return Prism.highlight(code, Prism.languages.javascript, 'jsx');
  }, [componentName, semanticName]);

  return (
    // biome-ignore lint: lint/security/noDangerouslySetInnerHtml
    <div dangerouslySetInnerHTML={{ __html: highlightCode }} />
  );
}

export interface SemanticPreviewProps {
  componentName: string;
  semantics: { name: string; desc: string; version?: string }[];
  children: React.ReactElement<any>;
  height?: number;
  padding?: false;
}

const SemanticPreview: React.FC<SemanticPreviewProps> = (props) => {
  const { semantics = [], children, height, padding, componentName = 'Component' } = props;
  const { token } = theme.useToken();

  // ======================= Semantic =======================
  const getMarkClassName = React.useCallback(
    (semanticKey: string) => `semantic-mark-${semanticKey}`.replace(/\./g, '-'),
    [],
  );

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

  const timerRef = React.useRef<ReturnType<typeof setTimeout>>(null);

  const [positionMotion, setPositionMotion] = React.useState<boolean>(false);
  const [hoverSemantic, setHoverSemantic] = React.useState<string | null>(null);
  const [markPos, setMarkPos] = React.useState<[number, number, number, number]>([0, 0, 0, 0]);

  const { styles } = useStyle(markPos);

  React.useEffect(() => {
    if (hoverSemantic) {
      const targetClassName = getMarkClassName(hoverSemantic);
      const targetElement = containerRef.current?.querySelector<HTMLElement>(`.${targetClassName}`);
      const containerRect = containerRef.current?.getBoundingClientRect();
      const targetRect = targetElement?.getBoundingClientRect();

      setMarkPos([
        (targetRect?.left || 0) - (containerRect?.left || 0),
        (targetRect?.top || 0) - (containerRect?.top || 0),
        targetRect?.width || 0,
        targetRect?.height || 0,
      ]);

      timerRef.current = setTimeout(() => {
        setPositionMotion(true);
      }, 10);
    } else {
      timerRef.current = setTimeout(() => {
        setPositionMotion(false);
      }, 500);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [hoverSemantic]);

  const hoveredSemanticClassNames = React.useMemo(() => {
    if (!hoverSemantic) {
      return semanticClassNames;
    }

    const hoverCell = getSemanticCells(hoverSemantic);
    const clone = set(
      semanticClassNames,
      hoverCell,
      classnames(get(semanticClassNames, hoverCell), getMarkClassName('active')),
    );

    return clone;
  }, [semanticClassNames, hoverSemantic]);

  // ======================== Render ========================
  const cloneNode = React.cloneElement(children, {
    classNames: hoveredSemanticClassNames,
  });

  return (
    <div className={classnames(styles.container)} ref={containerRef}>
      <Row style={{ minHeight: height }}>
        <Col
          span={16}
          className={classnames(styles.colWrap, padding === false && styles.colWrapPaddingLess)}
        >
          <ConfigProvider theme={{ token: { motion: false } }}>{cloneNode}</ConfigProvider>
        </Col>
        <Col span={8}>
          <ul className={classnames(styles.listWrap)}>
            {semantics.map<React.ReactNode>((semantic) => (
              <li
                key={semantic.name}
                className={classnames(styles.listItem)}
                onMouseEnter={() => setHoverSemantic(semantic.name)}
                onMouseLeave={() => setHoverSemantic(null)}
              >
                <Flex vertical gap="small">
                  <Flex gap="small" align="center" justify="space-between">
                    <Flex gap="small" align="center">
                      <Typography.Title level={5} style={{ margin: 0 }}>
                        {semantic.name}
                      </Typography.Title>
                      {semantic.version && <Tag color="blue">{semantic.version}</Tag>}
                    </Flex>
                    <Popover
                      content={
                        <Typography style={{ fontSize: 12, minWidth: 300 }}>
                          <pre dir="ltr">
                            <code dir="ltr">
                              <HighlightExample
                                componentName={componentName}
                                semanticName={semantic.name}
                              />
                            </code>
                          </pre>
                        </Typography>
                      }
                    >
                      <InfoCircleOutlined
                        style={{ cursor: 'pointer', color: token.colorTextSecondary }}
                      />
                    </Popover>
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
      <div
        className={classnames(
          styles.marker,
          hoverSemantic ? styles.markerActive : styles.markerNotActive,
          positionMotion ? styles.markerMotion : styles.markerNotMotion,
        )}
      />
    </div>
  );
};

export default SemanticPreview;
