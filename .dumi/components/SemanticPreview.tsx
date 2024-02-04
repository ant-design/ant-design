import * as React from 'react';
import { Col, ConfigProvider, Flex, Row, Tag, theme, Typography } from 'antd';

export interface SemanticPreviewProps {
  semantics: { name: string; desc: string; version?: string }[];
  children: React.ReactElement;
  height?: number;
}

const SemanticPreview = (props: SemanticPreviewProps) => {
  const { semantics = [], children, height } = props;
  const { token } = theme.useToken();

  // ======================= Semantic =======================
  const getMarkClassName = React.useCallback(
    (semanticKey: string) => `semantic-mark-${semanticKey}`,
    [],
  );

  const semanticClassNames = React.useMemo(() => {
    const classNames: Record<string, string> = {};

    semantics.forEach((semantic) => {
      classNames[semantic.name] = getMarkClassName(semantic.name);
    });

    return classNames;
  }, [semantics]);

  const cloneNode = React.cloneElement(children, {
    classNames: semanticClassNames,
  });

  // ======================== Hover =========================
  const MARK_BORDER_SIZE = 2;
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [positionMotion, setPositionMotion] = React.useState(false);

  const [hoverSemantic, setHoverSemantic] = React.useState<string | null>(null);
  const [markPos, setMarkPos] = React.useState<
    [left: number, top: number, width: number, height: number]
  >([0, 0, 0, 0]);

  React.useEffect(() => {
    if (hoverSemantic) {
      const targetClassName = getMarkClassName(hoverSemantic);
      const targetElement = containerRef.current?.querySelector(`.${targetClassName}`);

      const containerRect = containerRef.current?.getBoundingClientRect();
      const targetRect = targetElement?.getBoundingClientRect();

      setMarkPos([
        (targetRect?.left || 0) - (containerRect?.left || 0),
        (targetRect?.top || 0) - (containerRect?.top || 0),
        targetRect?.width || 0,
        targetRect?.height || 0,
      ]);

      setTimeout(() => {
        setPositionMotion(true);
      }, 10);
    } else {
      const timeout = setTimeout(() => {
        setPositionMotion(false);
      }, 500);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [hoverSemantic]);

  // ======================== Render ========================
  return (
    <div style={{ position: 'relative' }} ref={containerRef}>
      <Row style={{ minHeight: height }}>
        <Col
          span={16}
          style={{
            borderRight: `1px solid ${token.colorBorderSecondary}`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: token.paddingMD,
            overflow: 'hidden',
          }}
        >
          <ConfigProvider
            theme={{
              token: {
                motion: false,
              },
            }}
          >
            {cloneNode}
          </ConfigProvider>
        </Col>
        <Col span={8}>
          <ul
            style={{
              rowGap: token.paddingXS,
              listStyle: 'none',
              margin: 0,
              padding: 0,
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {semantics.map((semantic, index) => (
              <li
                key={semantic.name}
                style={{
                  paddingBlock: token.paddingXS,
                  paddingInline: token.paddingSM,
                  cursor: 'pointer',
                  borderTop: index === 0 ? 'none' : `1px solid ${token.colorBorderSecondary}`,
                  background:
                    hoverSemantic === semantic.name ? token.controlItemBgHover : 'transparent',
                  transition: `background ${token.motionDurationFast} ease`,
                }}
                onMouseEnter={() => {
                  setHoverSemantic(semantic.name);
                }}
                onMouseLeave={() => {
                  setHoverSemantic(null);
                }}
              >
                <Flex vertical gap={token.paddingXS}>
                  <Flex gap={token.paddingXS} align="center">
                    <Typography.Title level={5} style={{ margin: 0 }}>
                      {semantic.name}
                    </Typography.Title>
                    {semantic.version && <Tag color="blue">{semantic.version}</Tag>}
                  </Flex>
                  <Typography.Paragraph style={{ margin: 0, fontSize: token.fontSizeSM }}>
                    {semantic.desc}
                  </Typography.Paragraph>{' '}
                </Flex>
              </li>
            ))}
          </ul>
        </Col>
      </Row>

      <div
        style={{
          position: 'absolute',
          border: `${MARK_BORDER_SIZE}px solid ${token.colorWarning}`,
          boxSizing: 'border-box',
          zIndex: 999999,
          left: markPos[0] - MARK_BORDER_SIZE,
          top: markPos[1] - MARK_BORDER_SIZE,
          width: markPos[2] + MARK_BORDER_SIZE * 2,
          height: markPos[3] + MARK_BORDER_SIZE * 2,
          boxShadow: '0 0 0 1px #FFF',
          pointerEvents: 'none',
          transition: [
            `opacity ${token.motionDurationSlow} ease`,
            positionMotion ? `all ${token.motionDurationSlow} ease` : null,
          ]
            .filter(Boolean)
            .join(','),
          opacity: hoverSemantic ? 1 : 0,
        }}
      />
    </div>
  );
};

export default SemanticPreview;
