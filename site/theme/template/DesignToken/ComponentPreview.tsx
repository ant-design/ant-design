import React, { FC, PropsWithChildren } from 'react';
import { Card } from 'antd';

export type ComponentPreviewProps = PropsWithChildren<{
  component: string;
  shownComponents: string[] | null;
}>;

const ComponentPreview: FC<ComponentPreviewProps> = ({ component, children, shownComponents }) => (
  <Card
    title={component}
    style={{
      display: shownComponents === null || shownComponents.includes(component) ? '' : 'none',
    }}
  >
    {children}
  </Card>
);

export default ComponentPreview;
