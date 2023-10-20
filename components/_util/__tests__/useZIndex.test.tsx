import type { PropsWithChildren } from 'react';
import React, { useEffect } from 'react';
import { render } from '@testing-library/react';
import { Drawer, Dropdown, Modal, Popconfirm, Popover, Select, Tooltip, Tour } from 'antd';

import type { ZIndexConsumer, ZIndexContainer } from '../hooks/useZIndex';
import { consumerBaseZIndexOffset, containerBaseZIndexOffset, useZIndex } from '../hooks/useZIndex';
import zIndexContext from '../zindexContext';

const WrapWithProvider: React.FC<PropsWithChildren<{ containerType: ZIndexContainer }>> = ({
  children,
  containerType,
}) => {
  const [, contextZIndex] = useZIndex(containerType);
  return <zIndexContext.Provider value={contextZIndex}>{children}</zIndexContext.Provider>;
};

const containerComponent: Record<ZIndexContainer, React.FC<PropsWithChildren>> = {
  Modal: ({ children, ...restProps }) => (
    <Modal {...restProps} open>
      {children}
    </Modal>
  ),
  Drawer: ({ children, ...restProps }) => (
    <Drawer {...restProps} open>
      {children}
    </Drawer>
  ),
  Popover: ({ children, ...restProps }) => (
    <Popover {...restProps} open content="test1" rootClassName="test1">
      {children}
    </Popover>
  ),
  Popconfirm: ({ children, ...restProps }) => (
    <Popconfirm {...restProps} open title="test1" rootClassName="test1">
      {children}
    </Popconfirm>
  ),
  Tooltip: ({ children, ...restProps }) => (
    <Tooltip {...restProps} open title="test1" rootClassName="test1">
      {children}
    </Tooltip>
  ),
  Tour: ({ children, ...restProps }) => (
    <Tour
      {...restProps}
      rootClassName="tour0"
      steps={[
        {
          title: 'cover title',
          description: children,
        },
      ]}
    />
  ),
};

const options = [
  {
    label: 'Option 1',
    value: '1',
  },
  {
    label: 'Option 2',
    value: '2',
  },
];

const consumerComponent: Record<ZIndexConsumer, React.FC<PropsWithChildren>> = {
  Select: ({ children, ...restProps }) => <Select {...restProps} options={options} open />,
  Dropdown: ({ children, ...restProps }) => (
    <Dropdown
      {...restProps}
      menu={{
        items: options.map((item) => ({
          key: item.value,
          label: item.label,
        })),
      }}
      open
    />
  ),
  Cascader: () => <div>Cascader</div>,
  TreeSelect: () => <div>TreeSelect</div>,
  AutoComplete: () => <div>AutoComplete</div>,
  ColorPicker: () => <div>ColorPicker</div>,
  DatePicker: () => <div>DatePicker</div>,
  TimePicker: () => <div>TimePicker</div>,
  Menu: () => <div>Menu</div>,
};

describe('Test useZIndex hooks', () => {
  Object.keys(containerBaseZIndexOffset).forEach((containerKey) => {
    Object.keys(consumerBaseZIndexOffset).forEach((key) => {
      describe(`Test ${key} zIndex in ${containerKey}`, () => {
        it('parentZIndex should be parent zIndex', () => {
          const fn = jest.fn();
          const Child = () => {
            const [zIndex] = useZIndex(key as ZIndexConsumer);
            useEffect(() => {
              fn(zIndex);
            }, [zIndex]);
            return <div>Child</div>;
          };

          const App = () => (
            <WrapWithProvider containerType={containerKey as ZIndexContainer}>
              <WrapWithProvider containerType={containerKey as ZIndexContainer}>
                <WrapWithProvider containerType={containerKey as ZIndexContainer}>
                  <Child />
                </WrapWithProvider>
              </WrapWithProvider>
            </WrapWithProvider>
          );
          render(<App />);
          expect(fn).toHaveBeenLastCalledWith(
            (1000 + containerBaseZIndexOffset[containerKey as ZIndexContainer]) * 3 +
              consumerBaseZIndexOffset[key as ZIndexConsumer],
          );
        });
      });
    });
  });
});
