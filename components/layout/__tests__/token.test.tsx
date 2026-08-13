import React from 'react';

import Layout from '..';
import { render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import Menu from '../../menu';

const { Header } = Layout;

describe('Layout.Token', () => {
  it('legacy theme should work', () => {
    const { container } = render(
      <ConfigProvider
        theme={{
          components: {
            Layout: {
              colorBgHeader: '#FF0000',
            },
            Menu: {
              // keep this deprecated one
              colorItemBg: '#00FF00',
            },
          },
        }}
      >
        <Layout>
          <Header>
            <Menu
              mode="horizontal"
              defaultSelectedKeys={['2']}
              items={Array.from({ length: 15 }).map((_, index) => {
                const key = index + 1;
                return {
                  key,
                  label: `nav ${key}`,
                };
              })}
            />
          </Header>
        </Layout>
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-layout')).toHaveStyle({
      '--ant-layout-header-bg': '#FF0000',
    });
    expect(container.querySelector('.ant-menu')).toHaveStyle({
      '--ant-menu-item-bg': '#00FF00',
    });
  });

  it('theme should work', () => {
    const { container } = render(
      <ConfigProvider
        theme={{
          components: {
            Layout: {
              headerBg: '#FF0000',
              lightHeaderBg: '#00FF00',
              lightHeaderColor: '#0000FF',
            },
            Menu: {
              itemBg: '#00FF00',
            },
          },
        }}
      >
        <Layout>
          <Header theme="light">
            <Menu
              mode="horizontal"
              defaultSelectedKeys={['2']}
              items={Array.from({ length: 15 }).map((_, index) => {
                const key = index + 1;
                return {
                  key,
                  label: `nav ${key}`,
                };
              })}
            />
          </Header>
        </Layout>
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-layout')).toHaveStyle({
      '--ant-layout-header-bg': '#FF0000',
      '--ant-layout-light-header-bg': '#00FF00',
      '--ant-layout-light-header-color': '#0000FF',
    });
    expect(container.querySelector('.ant-layout-header')).toHaveClass('ant-layout-header-light');
    expect(container.querySelector('.ant-menu')).toHaveStyle({
      '--ant-menu-item-bg': '#00FF00',
    });
  });
});
