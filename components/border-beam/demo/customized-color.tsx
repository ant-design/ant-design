import React from 'react';
import { BorderBeam, Col, Flex, Row, theme, Typography } from 'antd';
import type { BorderBeamGradient } from 'antd';

const presets: Array<{
  name: string;
  usage: string;
  description: string;
  color: BorderBeamGradient;
}> = [
  {
    name: 'Ocean',
    usage: 'Dashboard',
    description: 'A calm blue-green accent that works well for data views and cloud tooling.',
    color: [
      { color: '#1677ff', percent: 0 },
      { color: '#36cfc9', percent: 52 },
      { color: '#95de64', percent: 100 },
    ],
  },
  {
    name: 'Sunset',
    usage: 'Upgrade',
    description: 'A warm highlight for upgrade prompts, featured cards, and marketing blocks.',
    color: [
      { color: '#ff7a45', percent: 0 },
      { color: '#ff4d4f', percent: 49 },
      { color: '#ff85c0', percent: 100 },
    ],
  },
  {
    name: 'Aurora',
    usage: 'AI',
    description:
      'A vivid cool-toned beam suited for AI assistants, copilots, and automation panels.',
    color: [
      { color: '#7c3aed', percent: 0 },
      { color: '#06b6d4', percent: 57 },
      { color: '#67e8f9', percent: 100 },
    ],
  },
  {
    name: 'Forest',
    usage: 'Recommendation',
    description:
      'A bright natural palette that feels good on recommendation and growth-oriented cards.',
    color: [
      { color: '#22c55e', percent: 0 },
      { color: '#a3e635', percent: 54 },
      { color: '#facc15', percent: 100 },
    ],
  },
];

const cardRadius = 24;
const PREVIEW_VISIBLE_PERCENT = 70;
const getPreviewPercent = (percent: number) =>
  Number(((Math.min(Math.max(percent, 0), 100) / 100) * PREVIEW_VISIBLE_PERCENT).toFixed(2));
const getPalettePreview = (color: BorderBeamGradient) =>
  `linear-gradient(to right, ${color
    .map((item) => `${item.color} ${getPreviewPercent(item.percent)}%`)
    .join(', ')}, transparent 100%)`;

const App: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <Row gutter={[24, 24]}>
      {presets.map((preset) => (
        <Col key={preset.name} xs={24} md={12}>
          <BorderBeam color={preset.color}>
            <Flex
              vertical
              gap={16}
              style={{
                padding: 24,
                borderRadius: cardRadius,
                border: `${token.lineWidth}px solid ${token.colorBorderSecondary}`,
                background: token.colorBgContainer,
                boxShadow: token.boxShadowTertiary,
              }}
            >
              <Flex align="center" justify="space-between" gap={12}>
                <Typography.Text type="secondary">{preset.usage}</Typography.Text>
                <div
                  style={{
                    width: 64,
                    height: 10,
                    borderRadius: 999,
                    border: `${token.lineWidth}px solid ${token.colorBorder}`,
                    background: getPalettePreview(preset.color),
                  }}
                />
              </Flex>
              <Typography.Title level={4} style={{ margin: 0 }}>
                {preset.name}
              </Typography.Title>
              <Typography.Text type="secondary">{preset.description}</Typography.Text>
            </Flex>
          </BorderBeam>
        </Col>
      ))}
    </Row>
  );
};

export default App;
