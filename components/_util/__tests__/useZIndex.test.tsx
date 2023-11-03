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
    <Popover {...restProps} open content="test">
      {children}
    </Popover>
  ),
  Popconfirm: ({ children, ...restProps }) => (
    <Popconfirm {...restProps} open title="test">
      {children}
    </Popconfirm>
  ),
  Tooltip: ({ children, ...restProps }) => (
    <Tooltip {...restProps} open title="test">
      {children}
    </Tooltip>
  ),
  Tour: ({ children, ...restProps }) => (
    <Tour
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
  SelectLike: ({ rootClassName, ...props }) => (
    <>
      <Select
        {...props}
        rootClassName={`${rootClassName} comp-item comp-Select`}
        options={options}
        open
      />
      <Cascader
        {...props}
        rootClassName={`${rootClassName} comp-item comp-Cascader`}
        options={options}
        open
      />
      <TreeSelect
        {...props}
        rootClassName={`${rootClassName} comp-item comp-TreeSelect`}
        treeData={options}
        open
      />
      <AutoComplete
        {...props}
        rootClassName={`${rootClassName} comp-item comp-AutoComplete`}
        options={options}
        open
      />
    </>
  ),
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
  ColorPicker: (props) => <ColorPicker {...props} open />,
  DatePicker: ({ rootClassName, ...props }) => (
    <>
      <DatePicker {...props} rootClassName={`${rootClassName} comp-item comp-DatePicker`} open />
      <DatePicker.TimePicker
        {...props}
        rootClassName={`${rootClassName} comp-item comp-TimePicker`}
        open
      />
    </>
  ),
  Menu: (props) => <Menu {...props} items={items} defaultOpenKeys={['SubMenu']} />,
};

function getConsumerSelector(baseSelector: string, consumer: ZIndexConsumer): string {
  let selector = baseSelector;
  if (consumer === 'SelectLike') {
    selector = ['Select', 'Cascader', 'TreeSelect', 'AutoComplete']
      .map((item) => `${baseSelector}.comp-${item}.ant-slide-up`)
      .join(',');
  } else if (consumer === 'DatePicker') {
    selector = ['DatePicker', 'TimePicker']
      .map((item) => `${baseSelector}.comp-${item}.ant-picker-dropdown`)
      .join(',');
  } else if (['Menu'].includes(consumer)) {
    selector = `${baseSelector}.ant-menu-submenu-placement-rightTop`;
  } else if (consumer === 'ColorPicker') {
    selector = `${baseSelector}.ant-popover-placement-bottomLeft`;
  }
  return selector;
}

describe('Test useZIndex hooks', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  const containers = Object.keys(containerComponent);
  const consumers = Object.keys(consumerComponent);

  containers.forEach((containerKey) => {
    consumers.forEach((key) => {
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

          const selector1 = getConsumerSelector('.consumer1', key as ZIndexConsumer);
          const selector2 = getConsumerSelector('.consumer2', key as ZIndexConsumer);
          const selector3 = getConsumerSelector('.consumer3', key as ZIndexConsumer);

          if (['SelectLike', 'DatePicker'].includes(key)) {
            let comps = document.querySelectorAll(selector1);
            comps.forEach((comp) => {
              expect((comp as HTMLDivElement).style.zIndex).toBeFalsy();
            });
            comps = document.querySelectorAll(selector2);
            comps.forEach((comp) => {
              expect((comp as HTMLDivElement).style.zIndex).toBe(
                String(
                  1000 +
                    containerBaseZIndexOffset[containerKey as ZIndexContainer] +
                    consumerBaseZIndexOffset[key as ZIndexConsumer],
                ),
              );
            });

            comps = document.querySelectorAll(selector3);
            comps.forEach((comp) => {
              expect((comp as HTMLDivElement).style.zIndex).toBe(
                String(
                  (1000 + containerBaseZIndexOffset[containerKey as ZIndexContainer]) * 2 +
                    consumerBaseZIndexOffset[key as ZIndexConsumer],
                ),
              );
            });
          } else {
            if (key === 'Tour') {
              expect((document.querySelector(selector1) as HTMLDivElement).style.zIndex).toBe(
                '1001',
              );
            } else {
              expect(
                (document.querySelector(selector1) as HTMLDivElement).style.zIndex,
              ).toBeFalsy();
            }
            expect((document.querySelector(selector2) as HTMLDivElement).style.zIndex).toBe(
              String(
                1000 +
                  containerBaseZIndexOffset[containerKey as ZIndexContainer] +
                  consumerBaseZIndexOffset[key as ZIndexConsumer],
              ),
            );

            expect((document.querySelector(selector3) as HTMLDivElement).style.zIndex).toBe(
              String(
                (1000 + containerBaseZIndexOffset[containerKey as ZIndexContainer]) * 2 +
                  consumerBaseZIndexOffset[key as ZIndexConsumer],
              ),
            );
          }

          unmount();
        }, 15000);
      });
    });
  });
});
