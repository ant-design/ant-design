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
        <Header>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={new Array(15).fill(null).map((_, index) => {
              const key = index + 1;
              return {
                key,
                label: `nav ${key}`,
              };
            })}
          />
        </Header>
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-layout-header')).toHaveStyle({
      backgroundColor: '#FF0000',
    });
    expect(container.querySelector('.ant-menu')).toHaveStyle({
      backgroundColor: '#00FF00',
    });
  });
  it('theme should work', () => {
    const { container } = render(
      <ConfigProvider
        theme={{
          components: {
            Layout: {
              colorBgHeader: '#FF0000',
            },
            Menu: {
              itemBg: '#00FF00',
            },
          },
        }}
      >
        <Header>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={new Array(15).fill(null).map((_, index) => {
              const key = index + 1;
              return {
                key,
                label: `nav ${key}`,
              };
            })}
          />
        </Header>
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-layout-header')).toHaveStyle({
      backgroundColor: '#FF0000',
    });
    expect(container.querySelector('.ant-menu')).toHaveStyle({
      backgroundColor: '#00FF00',
    });
  });
});
