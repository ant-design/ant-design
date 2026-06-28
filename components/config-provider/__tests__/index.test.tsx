import React, { useState } from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import { LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import { vi } from 'vitest';

import type { ConfigConsumerProps, RenderEmptyHandler } from '..';
import ConfigProvider, { ConfigContext } from '..';
import { resetWarned } from '../../_util/warning';
import mountTest from '../../../tests/shared/mountTest';
import { fireEvent, render } from '../../../tests/utils';
import Button from '../../button';
import Form from '../../form';
import Input from '../../input';
import Select from '../../select';
import Table from '../../table';

describe('ConfigProvider', () => {
  mountTest(() => (
    <ConfigProvider>
      <div />
    </ConfigProvider>
  ));

  it('autoInsertSpaceInButton', () => {
    const text = '确定';
    const { container } = render(
      <ConfigProvider autoInsertSpaceInButton={false}>
        <Button>{text}</Button>
      </ConfigProvider>,
    );
    expect(container.querySelector<HTMLSpanElement>('span')?.innerHTML).toBe(text);
  });

  it('button.autoInsertSpace', () => {
    const text = '确定';
    const { container } = render(
      <ConfigProvider button={{ autoInsertSpace: false }}>
        <Button>{text}</Button>
      </ConfigProvider>,
    );
    expect(container.querySelector<HTMLSpanElement>('span')?.innerHTML).toBe(text);
  });

  it('renderEmpty', () => {
    const text = 'empty placeholder';
    const { container } = render(
      <ConfigProvider renderEmpty={() => <div>{text}</div>}>
        <Table />
      </ConfigProvider>,
    );
    expect(container.querySelector('.ant-table-placeholder')?.querySelector('div')?.innerHTML).toBe(
      text,
    );
  });

  it('nest prefixCls', () => {
    const { container } = render(
      <ConfigProvider prefixCls="bamboo">
        <ConfigProvider>
          <Button />
        </ConfigProvider>
      </ConfigProvider>,
    );

    expect(container.querySelector('button.bamboo-btn')).toBeTruthy();
  });

  it('dynamic prefixCls', () => {
    const DynamicPrefixCls: React.FC = () => {
      const [prefixCls, setPrefixCls] = useState('bamboo');
      return (
        <div>
          <Button onClick={() => setPrefixCls('light')} className="toggle-button">
            toggle
          </Button>
          <ConfigProvider prefixCls={prefixCls}>
            <ConfigProvider>
              <Button />
            </ConfigProvider>
          </ConfigProvider>
        </div>
      );
    };

    const { container } = render(<DynamicPrefixCls />);

    expect(container.querySelector('button.bamboo-btn')).toBeTruthy();
    fireEvent.click(container.querySelector('.toggle-button')!);
    expect(container.querySelector('button.light-btn')).toBeTruthy();
  });

  it('iconPrefixCls', () => {
    const { container } = render(
      <ConfigProvider iconPrefixCls="bamboo">
        <SmileOutlined />
      </ConfigProvider>,
    );

    expect(container.querySelector('[role="img"]')).toHaveClass('bamboo');
    expect(container.querySelector('[role="img"]')).toHaveClass('bamboo-smile');
  });

  // https://github.com/ant-design/ant-design/issues/52412
  it('should keep spin animation styles when multiple icon prefixes coexist', () => {
    const cache = createCache();

    render(
      <StyleProvider cache={cache}>
        <>
          <ConfigProvider>
            <LoadingOutlined spin />
          </ConfigProvider>
          <ConfigProvider iconPrefixCls="customicon">
            <LoadingOutlined spin />
          </ConfigProvider>
        </>
      </StyleProvider>,
    );

    const styleText = extractStyle(cache, { plain: true });

    expect(styleText).toContain('.anticon-spin{animation-name:loadingCircle;');
    expect(styleText).toContain('.customicon-spin{animation-name:loadingCircle;');
  });

  it('input autoComplete', () => {
    const { container } = render(
      <ConfigProvider input={{ autoComplete: 'off' }}>
        <Input />
      </ConfigProvider>,
    );
    expect(container.querySelector('input')?.autocomplete).toBe('off');
  });

  it('select showSearch', () => {
    const { container } = render(
      <ConfigProvider select={{ showSearch: true }}>
        <Select />
      </ConfigProvider>,
    );
    expect(container.querySelectorAll('.ant-select-show-search').length).toBe(1);
  });

  it('render empty', () => {
    let rendered = false;
    let cacheRenderEmpty: RenderEmptyHandler | undefined;

    const App: React.FC = () => {
      const { renderEmpty } = React.useContext<ConfigConsumerProps>(ConfigContext);
      rendered = true;
      cacheRenderEmpty = renderEmpty;
      return null;
    };

    render(
      <ConfigProvider>
        <App />
      </ConfigProvider>,
    );

    expect(rendered).toBeTruthy();
    expect(cacheRenderEmpty).toBeFalsy();
  });

  it('warning support filter level', () => {
    resetWarned();
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(<ConfigProvider dropdownMatchSelectWidth warning={{ strict: false }} />);
    expect(errSpy).not.toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalled();

    errSpy.mockRestore();
    warnSpy.mockRestore();
  });

  it('should support variant', () => {
    const { container } = render(
      <>
        <ConfigProvider variant="filled">
          <Input id="variant-input-1" />
        </ConfigProvider>
        <ConfigProvider variant="filled">
          <Input id="variant-input-2" variant="outlined" />
        </ConfigProvider>
        <ConfigProvider variant="filled">
          <Form variant="borderless">
            <Input id="variant-input-3" />
          </Form>
        </ConfigProvider>
        <ConfigProvider input={{ variant: 'filled' }}>
          <Input id="variant-input-4" />
        </ConfigProvider>
        <ConfigProvider variant="borderless" input={{ variant: 'filled' }}>
          <Input id="variant-input-5" />
        </ConfigProvider>
        <ConfigProvider variant="borderless" input={{ variant: 'filled' }}>
          <Form variant="outlined">
            <Input id="variant-input-6" />
          </Form>
        </ConfigProvider>
      </>,
    );

    expect(container.querySelector('#variant-input-1')).toHaveClass('ant-input-filled');
    expect(container.querySelector('#variant-input-2')).toHaveClass('ant-input-outlined');
    expect(container.querySelector('#variant-input-3')).toHaveClass('ant-input-borderless');
    expect(container.querySelector('#variant-input-4')).toHaveClass('ant-input-filled');
    expect(container.querySelector('#variant-input-5')).toHaveClass('ant-input-filled');
    expect(container.querySelector('#variant-input-6')).toHaveClass('ant-input-outlined');
  });

  it('motion config should not trigger re-mount', () => {
    let mountTime = 0;

    const Render = () => {
      React.useEffect(() => {
        mountTime += 1;
      }, []);

      return null;
    };

    // No motion
    const { rerender } = render(
      <ConfigProvider theme={{ token: { motion: false } }}>
        <Render />
      </ConfigProvider>,
      {
        wrapper: undefined!,
      },
    );
    expect(mountTime).toBe(1);

    // Motion
    rerender(
      <ConfigProvider theme={{ token: { motion: true } }}>
        <Render />
      </ConfigProvider>,
    );
    expect(mountTime).toBe(1);

    // No motion again
    rerender(
      <ConfigProvider theme={{ token: { motion: false } }}>
        <Render />
      </ConfigProvider>,
    );
    expect(mountTime).toBe(1);
  });
});
