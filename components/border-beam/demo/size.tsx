import React from 'react';
import { BorderBeam, Card, Tag, Typography } from 'antd';

const sizes: Array<{
  name: string;
  size?: number | string;
  bodyMinHeight: number;
  description: string;
  spanFull?: boolean;
}> = [
  {
    name: 'Default',
    bodyMinHeight: 112,
    description: 'Uses the default 100px visible beam segment.',
  },
  {
    name: 'Compact',
    size: 56,
    bodyMinHeight: 112,
    description: 'Keeps the highlight shorter for dense card groups.',
  },
  {
    name: 'Extended',
    size: 160,
    bodyMinHeight: 192,
    description: 'Creates a longer highlight for wider feature panels.',
    spanFull: true,
  },
];

const App: React.FC = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: 32,
      maxWidth: 960,
    }}
  >
    {sizes.map(({ name, size, bodyMinHeight, description, spanFull }) => (
      <div key={name} style={{ gridColumn: spanFull ? '1 / -1' : undefined }}>
        <BorderBeam size={size}>
          <Card
            title={name}
            extra={<Tag variant="filled">{size ?? 100}px</Tag>}
            styles={{ body: { minHeight: bodyMinHeight, display: 'flex', alignItems: 'center' } }}
          >
            <Typography.Text type="secondary">{description}</Typography.Text>
          </Card>
        </BorderBeam>
      </div>
    ))}
  </div>
);

export default App;
