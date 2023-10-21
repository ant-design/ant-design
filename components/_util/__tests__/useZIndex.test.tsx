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

import { waitFakeTimer } from '../../../tests/utils';
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
      open
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
  const containers = Object.keys(containerComponent);
  const consumers = Object.keys(consumerComponent);
  // const containers: ZIndexContainer[] = ['Modal'];
  // const consumers: ZIndexConsumer[] = ['ColorPicker'];
  // const containers: ZIndexContainer[] = Object.keys(containerComponent) as ZIndexContainer[];

  containers.forEach((containerKey) => {
    consumers.forEach((key) => {
      describe(`Test ${key} zIndex in ${containerKey}`, () => {
        beforeEach(() => {
          jest.useFakeTimers();
        });
        afterEach(() => {
          jest.useRealTimers();
        });
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
          if (key === 'ColorPicker') {
            expect(fn).toHaveBeenLastCalledWith(
              (1000 + containerBaseZIndexOffset[containerKey as ZIndexContainer]) * 3 +
                consumerBaseZIndexOffset[key as ZIndexConsumer],
            );
          } else {
            expect(fn).toHaveBeenLastCalledWith(
              (1000 + containerBaseZIndexOffset[containerKey as ZIndexContainer]) * 3 +
                consumerBaseZIndexOffset[key as ZIndexConsumer],
            );
          }
        });
        it('Test Component', async () => {
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

          const { unmount } = render(<App />);

          await waitFakeTimer(1000);

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

          if (key === 'ColorPicker') {
            expect(
              (
                document.querySelector(
                  '.consumer2.ant-popover-placement-bottomLeft',
                ) as HTMLDivElement
              ).style.zIndex,
            ).toBe(
              String(
                // container z-index
                1000 +
                  containerBaseZIndexOffset[containerKey as ZIndexContainer] +
                  // color picker z-index offset
                  consumerBaseZIndexOffset.ColorPicker,
              ),
            );
          } else {
            let selector = '.consumer2';
            if (['TreeSelect', 'AutoComplete', 'Select', 'Cascader'].includes(key)) {
              selector = '.consumer2.ant-slide-up';
            } else if (['DatePicker', 'TimePicker'].includes(key)) {
              selector = '.consumer2.ant-picker-dropdown';
            } else if (['Menu'].includes(key)) {
              selector = '.consumer2.ant-menu-submenu-placement-rightTop';
            }

            expect((document.querySelector(selector) as HTMLDivElement).style.zIndex).toBe(
              String(
                1000 +
                  containerBaseZIndexOffset[containerKey as ZIndexContainer] +
                  consumerBaseZIndexOffset[key as ZIndexConsumer],
              ),
            );
          }

          unmount();
        });
      });
    });
  });
});
