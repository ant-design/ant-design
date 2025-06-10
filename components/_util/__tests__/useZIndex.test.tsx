import type { PropsWithChildren } from 'react';
import React, { useEffect } from 'react';
import { render } from '@testing-library/react';

import { waitFakeTimer } from '../../../tests/utils';
import type { ImageProps, MenuProps } from '../../index';
import {
  App,
  AutoComplete,
  Cascader,
  ColorPicker,
  DatePicker,
  Drawer,
  Dropdown,
  FloatButton,
  Image,
  Menu,
  Modal,
  Popconfirm,
  Popover,
  Select,
  Tooltip,
  Tour,
  TreeSelect,
} from '../../index';
import type { ZIndexConsumer, ZIndexContainer } from '../hooks/useZIndex';
import { consumerBaseZIndexOffset, containerBaseZIndexOffset, useZIndex } from '../hooks/useZIndex';
import { resetWarned } from '../warning';
import zIndexContext from '../zindexContext';

// TODO: Remove this. Mock for React 19
jest.mock('react-dom', () => {
  const realReactDOM = jest.requireActual('react-dom');

  if (realReactDOM.version.startsWith('19')) {
    const realReactDOMClient = jest.requireActual('react-dom/client');
    realReactDOM.createRoot = realReactDOMClient.createRoot;
  }

  return realReactDOM;
});

const WrapWithProvider: React.FC<PropsWithChildren<{ container: ZIndexContainer }>> = ({
  children,
  container,
}) => {
  const [, contextZIndex] = useZIndex(container);
  return <zIndexContext.Provider value={contextZIndex}>{children}</zIndexContext.Provider>;
};

const containerComponent: Partial<
  Record<ZIndexContainer, React.FC<Readonly<PropsWithChildren<{ rootClassName?: string }>>>>
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
    <Tour {...restProps} open steps={[{ title: 'cover title', description: children }]} />
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

const consumerComponent: Partial<
  Record<ZIndexConsumer, React.FC<Readonly<{ rootClassName: string }>>>
> = {
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
      <ColorPicker {...props} open rootClassName={`${rootClassName} comp-item comp-ColorPicker`} />
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
  ImagePreview: ({ rootClassName }: ImageProps) => (
    <>
      <Image
        src="xxx"
        preview={{
          visible: true,
          rootClassName: `${rootClassName} comp-item comp-ImagePreview`,
        }}
      />
      <Image.PreviewGroup
        preview={{
          visible: true,
          rootClassName: `${rootClassName} comp-item comp-ImagePreviewGroup`,
        }}
      >
        <Image src="xxx" />
      </Image.PreviewGroup>
    </>
  ),
};

const getConsumerSelector = (baseSelector: string, consumer: ZIndexConsumer): string => {
  let selector = baseSelector;
  if (consumer === 'SelectLike') {
    selector = ['Select', 'Cascader', 'TreeSelect', 'AutoComplete', 'ColorPicker']
      .map((item) =>
        item === 'ColorPicker'
          ? `${baseSelector}.ant-popover-placement-bottomLeft`
          : `${baseSelector}.comp-${item}.ant-slide-up`,
      )
      .join(',');
  } else if (consumer === 'DatePicker') {
    selector = ['DatePicker', 'TimePicker']
      .map((item) => `${baseSelector}.comp-${item}.ant-picker-dropdown`)
      .join(',');
  } else if (['Menu'].includes(consumer)) {
    selector = `${baseSelector}.ant-menu-submenu-placement-rightTop`;
  } else if (consumer === 'ImagePreview') {
    selector = ['ImagePreview', 'ImagePreviewGroup']
      .map(
        (item) =>
          `${baseSelector}.comp-${item} .ant-image-preview-wrap, ${baseSelector}.comp-${item}.ant-image-preview-operations-wrapper`,
      )
      .join(',');
  }
  return selector;
};

describe('Test useZIndex hooks', () => {
  beforeEach(() => {
    resetWarned();
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  Object.keys(containerComponent).forEach((containerKey) => {
    Object.keys(consumerComponent).forEach((key) => {
      const containerZIndexValue = containerBaseZIndexOffset[containerKey as ZIndexContainer];
      const consumerZIndexValue = consumerBaseZIndexOffset[key as ZIndexConsumer];
      describe(`Test ${key} zIndex in ${containerKey}`, () => {
        it('Test hooks', () => {
          const fn = jest.fn();
          const Child: React.FC = () => {
            const [zIndex] = useZIndex(key as ZIndexConsumer);
            useEffect(() => {
              fn(zIndex);
            }, [zIndex]);
            return <div>Child</div>;
          };

          const Demo: React.FC = () => (
            <WrapWithProvider container={containerKey as ZIndexContainer}>
              <WrapWithProvider container={containerKey as ZIndexContainer}>
                <WrapWithProvider container={containerKey as ZIndexContainer}>
                  <Child />
                </WrapWithProvider>
              </WrapWithProvider>
            </WrapWithProvider>
          );
          render(<Demo />);

          expect(fn).toHaveBeenLastCalledWith(
            1000 + containerZIndexValue * 3 + consumerZIndexValue,
          );
        });

        it('Test Component', async () => {
          const Container = containerComponent[containerKey as ZIndexContainer]!;
          const Consumer = consumerComponent[key as ZIndexConsumer]!;

          const Demo: React.FC = () => (
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

          const { unmount } = render(<Demo />);

          await waitFakeTimer(1000);

          const selector1 = getConsumerSelector('.consumer1', key as ZIndexConsumer);
          const selector2 = getConsumerSelector('.consumer2', key as ZIndexConsumer);
          const selector3 = getConsumerSelector('.consumer3', key as ZIndexConsumer);

          if (['SelectLike', 'DatePicker', 'ImagePreview'].includes(key)) {
            let comps = document.querySelectorAll<HTMLElement>(selector1);
            comps.forEach((comp) => {
              expect(comp?.style.zIndex).toBeFalsy();
            });
            comps = document.querySelectorAll<HTMLElement>(selector2);
            comps.forEach((comp) => {
              const isColorPicker = comp?.className.includes('comp-ColorPicker');
              const consumerOffset = isColorPicker
                ? containerBaseZIndexOffset.Popover
                : consumerZIndexValue;
              const operOffset = comp.classList.contains('ant-image-preview-operations-wrapper')
                ? 1
                : 0;
              expect(comp?.style.zIndex).toBe(
                String(1000 + containerZIndexValue + consumerOffset + operOffset),
              );
            });

            comps = document.querySelectorAll<HTMLElement>(selector3);
            comps.forEach((comp) => {
              const isColorPicker = comp?.className.includes('comp-ColorPicker');
              const consumerOffset = isColorPicker
                ? containerBaseZIndexOffset.Popover
                : consumerZIndexValue;
              const operOffset = comp.classList.contains('ant-image-preview-operations-wrapper')
                ? 1
                : 0;
              expect(comp?.style.zIndex).toBe(
                String(1000 + containerZIndexValue * 2 + consumerOffset + operOffset),
              );
            });
          } else {
            const element1 = document.querySelector<HTMLElement>(selector1);
            const element2 = document.querySelector<HTMLElement>(selector2);
            const element3 = document.querySelector<HTMLElement>(selector3);
            expect(element1?.style.zIndex).toBe(key === 'Tour' ? '1001' : '');
            expect(element2?.style.zIndex).toBe(
              String(1000 + containerZIndexValue + consumerZIndexValue),
            );
            expect(element3?.style.zIndex).toBe(
              String(1000 + containerZIndexValue * 2 + consumerZIndexValue),
            );
          }
          unmount();
        }, 20000);
      });
    });
  });

  it('Modal static func should always use max zIndex', async () => {
    jest.useFakeTimers();

    const instance = Modal.confirm({
      title: 'bamboo',
      content: <Select open />,
    });

    await waitFakeTimer();

    expect(document.querySelector('.ant-modal-wrap')).toHaveStyle({
      zIndex: '2000',
    });

    expect(document.querySelector('.ant-select-dropdown')).toHaveStyle({
      zIndex: '2050',
    });

    instance.destroy();

    await waitFakeTimer();

    // Clean up for static method
    document.body.innerHTML = '';

    jest.useRealTimers();
  });

  it('warning for too large zIndex auto offset', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <Drawer open zIndex={999999999}>
        <Tooltip open title="test">
          <div>test</div>
        </Tooltip>
      </Drawer>,
    );

    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Tooltip] `zIndex` is over design token `zIndexPopupBase` too much. It may cause unexpected override.',
    );

    errorSpy.mockRestore();
  });

  it('FloatButton support zIndex', () => {
    const { container, rerender } = render(
      <WrapWithProvider container="FloatButton">
        <FloatButton />
      </WrapWithProvider>,
    );
    expect(container.querySelector<HTMLElement>('.ant-float-btn')?.style.zIndex).toBe(
      // parentZIndex + containerBaseZIndexOffset["FloatButton"]
      String(1100 + containerBaseZIndexOffset.FloatButton),
    );
    rerender(
      <WrapWithProvider container="FloatButton">
        <FloatButton style={{ zIndex: 666 }} />
      </WrapWithProvider>,
    );
    expect(container.querySelector<HTMLElement>('.ant-float-btn')?.style.zIndex).toBe(String(666));
  });

  it('not warning for static func', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const Demo = () => {
      const { modal } = App.useApp();

      React.useEffect(() => {
        modal.confirm({ content: <Select open /> });
      }, []);

      return null;
    };

    render(
      <App>
        <Demo />
      </App>,
    );

    expect(errorSpy).not.toHaveBeenCalled();

    errorSpy.mockRestore();
  });
});
