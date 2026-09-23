import React from 'react';
import { Segmented, Tabs } from 'antd';
import type { SegmentedProps, TabsProps } from 'antd';

const items: TabsProps['items'] = Array.from({ length: 12 }, (_, i) => {
  const id = String(i);
  return { key: id, label: `Tab ${id}`, children: `Content of Tab ${id}` };
});

const scrollPositionOptions: NonNullable<SegmentedProps<TabsProps['scrollPosition']>['options']> = [
  { label: 'auto', value: 'auto' },
  { label: 'start', value: 'start' },
  { label: 'center', value: 'center' },
  { label: 'end', value: 'end' },
  { label: '0.25', value: 0.25 },
];

const tabPlacementOptions: NonNullable<
  SegmentedProps<NonNullable<TabsProps['tabPlacement']>>['options']
> = [
  { label: 'top', value: 'top' },
  { label: 'start', value: 'start' },
];

const App: React.FC = () => {
  const [scrollPosition, setScrollPosition] = React.useState<TabsProps['scrollPosition']>('center');
  const [tabPlacement, setTabPlacement] =
    React.useState<NonNullable<TabsProps['tabPlacement']>>('top');

  return (
    <>
      <Segmented<TabsProps['scrollPosition']>
        value={scrollPosition}
        onChange={setScrollPosition}
        options={scrollPositionOptions}
        style={{ marginBottom: 8 }}
      />
      <Segmented<NonNullable<TabsProps['tabPlacement']>>
        value={tabPlacement}
        onChange={setTabPlacement}
        options={tabPlacementOptions}
        style={{ marginBottom: 16 }}
      />
      <Tabs
        defaultActiveKey="6"
        scrollPosition={scrollPosition}
        tabPlacement={tabPlacement}
        style={{ height: 180 }}
        items={items}
      />
    </>
  );
};

export default App;
