import type { PropsWithChildren } from 'react';
import React, { useEffect } from 'react';
import { render } from '@testing-library/react';
import type { MenuProps } from 'antd';
import {
  AutoComplete,
  Cascader,
  ColorPicker,
  DatePicker,
  Drawer,
  Dropdown,
  Menu,
  Modal,
  Popconfirm,
  Popover,
  Select,
  Tooltip,
  Tour,
  TreeSelect,
} from 'antd';

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

const containerComponent: Record<
  ZIndexContainer,
  React.FC<PropsWithChildren<{ rootClassName?: string }>>
> = {
  Modal: ({ children, rootClassName, ...restProps }) => (
    <Modal rootClassName={rootClassName} {...restProps} open>
      {children}
    </Modal>
  ),
  Drawer: ({ children, rootClassName, ...restProps }) => (
    <Drawer rootClassName={rootClassName} {...restProps} open>
      {children}
    </Drawer>
  ),
  Popover: ({ children, rootClassName, ...restProps }) => (
    <Popover rootClassName={rootClassName} {...restProps} open content="test">
      {children}
    </Popover>
  ),
  Popconfirm: ({ children, rootClassName, ...restProps }) => (
    <Popconfirm rootClassName={rootClassName} {...restProps} open title="test">
      {children}
    </Popconfirm>
  ),
  Tooltip: ({ children, rootClassName, ...restProps }) => (
    <Tooltip rootClassName={rootClassName} {...restProps} open title="test">
      {children}
    </Tooltip>
  ),
  Tour: ({ children, rootClassName, ...restProps }) => (
    <Tour
      rootClassName={rootClassName}
      {...restProps}
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

const items: MenuProps['items'] = [
  {
    label: 'Test',
    key: 'SubMenu',
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
];

const consumerComponent: Record<ZIndexConsumer, React.FC<{ rootClassName: string }>> = {
  Select: (props) => <Select {...props} options={options} open />,
  Dropdown: (props) => (
    <Dropdown
      {...props}
      menu={{
        items: options.map((item) => ({
          key: item.value,
          label: item.label,
        })),
      }}
      open
    >
      <button type="button">test</button>
    </Dropdown>
  ),
  Cascader: (props) => <Cascader {...props} options={options} open />,
  TreeSelect: (props) => <TreeSelect {...props} treeData={options} open />,
  AutoComplete: (props) => <AutoComplete {...props} options={options} open />,
  ColorPicker: (props) => <ColorPicker {...props} open />,
  DatePicker: (props) => <DatePicker {...props} open />,
  TimePicker: (props) => <DatePicker.TimePicker {...props} open />,
  Menu: (props) => <Menu {...props} items={items} defaultOpenKeys={['SubMenu']} />,
};

describe('Test useZIndex hooks', () => {
  Object.keys(containerBaseZIndexOffset).forEach((containerKey) => {
    Object.keys(consumerBaseZIndexOffset).forEach((key) => {
      describe(`Test ${key} zIndex in ${containerKey}`, () => {
        it('Test hooks', () => {
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
        it('Test Component', () => {
          const Container = containerComponent[containerKey as ZIndexContainer];
          const Consumer = consumerComponent[key as ZIndexConsumer];

          const App = () => (
            <>
              <Consumer rootClassName="consumer1" />
              <Container rootClassName="container1">
                <Consumer rootClassName="consumer2" />
                <Container rootClassName="container2">
                  <Consumer rootClassName="consumer3" />
                </Container>
              </Container>
            </>
          );

          render(<App />);

          expect((document.querySelector('.consumer1') as HTMLDivElement).style.zIndex).toBeFalsy();
          if (containerKey !== 'Tour') {
            expect(
              (document.querySelector('.container1') as HTMLDivElement).style.zIndex,
            ).toBeFalsy();
          } else {
            expect((document.querySelector('.container1') as HTMLDivElement).style.zIndex).toBe(
              '1001',
            );
          }

          expect((document.querySelector('.consumer2') as HTMLDivElement).style.zIndex).toBe(
            1000 +
              containerBaseZIndexOffset[containerKey as ZIndexContainer] +
              consumerBaseZIndexOffset[key as ZIndexConsumer],
          );
        });
      });
    });
  });
});
