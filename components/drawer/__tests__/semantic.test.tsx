import React from 'react';

import Drawer from '..';
import type { DrawerProps } from '..';
import { render } from '../../../tests/utils';

describe('Drawer.Semantic', () => {
  it('should apply custom classnames & styles to Drawer', () => {
    const customClassNames: DrawerProps['classNames'] = {
      root: 'custom-root',
      mask: 'custom-mask',
      header: 'custom-header',
      title: 'custom-title',
      extra: 'custom-extra',
      section: 'custom-section',
      body: 'custom-body',
      footer: 'custom-footer',
    };

    const customStyles: DrawerProps['styles'] = {
      root: { fontSize: '24px' },
      mask: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
      header: { borderBottom: '1px solid rgb(232, 232, 232)' },
      title: { fontWeight: 'bold' },
      extra: { color: 'rgb(255, 0, 0)' },
      section: { padding: '24px' },
      body: { color: 'rgb(0, 255, 0)' },
      footer: { color: 'rgb(255, 255, 0)' },
    };

    const { container } = render(
      <Drawer
        open
        classNames={customClassNames}
        styles={customStyles}
        title="title"
        placement="right"
        footer={'Footer'}
        closable={false}
        getContainer={false}
        extra={'Cancel'}
      >
        test
      </Drawer>,
    );

    const rootElement = container.querySelector<HTMLElement>('.ant-drawer');
    const maskElement = container.querySelector<HTMLElement>('.ant-drawer-mask');
    const headerElement = container.querySelector<HTMLElement>('.ant-drawer-header');
    const titleElement = container.querySelector<HTMLElement>('.ant-drawer-title');
    const extraElement = container.querySelector<HTMLElement>('.ant-drawer-extra');
    const sectionElement = container.querySelector<HTMLElement>('.ant-drawer-section');
    const bodyElement = container.querySelector<HTMLElement>('.ant-drawer-body');
    const footerElement = container.querySelector<HTMLElement>('.ant-drawer-footer');

    // check classNames
    expect(rootElement).toHaveClass('custom-root');
    expect(maskElement).toHaveClass('custom-mask');
    expect(headerElement).toHaveClass('custom-header');
    expect(titleElement).toHaveClass('custom-title');
    expect(extraElement).toHaveClass('custom-extra');
    expect(sectionElement).toHaveClass('custom-section');
    expect(bodyElement).toHaveClass('custom-body');
    expect(footerElement).toHaveClass('custom-footer');

    // check styles
    expect(rootElement).toHaveStyle({ 'font-size': '24px' });
    expect(maskElement).toHaveStyle({ 'background-color': 'rgba(0, 0, 0, 0.5)' });
    expect(headerElement).toHaveStyle({ 'border-bottom': '1px solid rgb(232, 232, 232)' });
    expect(titleElement).toHaveStyle({ 'font-weight': 'bold' });
    expect(extraElement).toHaveStyle({ color: 'rgb(255, 0, 0)' });
    expect(sectionElement).toHaveStyle({ padding: '24px' });
    expect(bodyElement).toHaveStyle({ color: 'rgb(0, 255, 0)' });
    expect(footerElement).toHaveStyle({ color: 'rgb(255, 255, 0)' });
  });

  it('should apply custom classnames & styles function to Drawer', () => {
    const customClassNames: DrawerProps['classNames'] = (info) => {
      return info?.props?.size === 'default'
        ? {
            root: 'custom-root-default',
            mask: 'custom-mask-default',
            header: 'custom-header-default',
            title: 'custom-title-default',
            extra: 'custom-extra-default',
            section: 'custom-section-default',
            body: 'custom-body-default',
            footer: 'custom-footer-default',
          }
        : {
            root: 'custom-root-large',
            mask: 'custom-mask-large',
            header: 'custom-header-large',
            title: 'custom-title-large',
            extra: 'custom-extra-large',
            section: 'custom-section-large',
            body: 'custom-body-large',
            footer: 'custom-footer-large',
          };
    };

    const customStyles: DrawerProps['styles'] = (info) => {
      return info?.props?.size === 'default'
        ? {
            root: { padding: '20px' },
            mask: { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
            header: { borderBottom: '1px solid rgb(250, 250, 250)' },
            title: { fontWeight: 'normal' },
            extra: { color: 'rgb(0, 0, 255)' },
            section: { padding: '18px' },
            body: { color: 'rgb(0, 200, 0)' },
            footer: { color: 'rgb(100, 0, 0)' },
          }
        : {
            root: { padding: '24px' },
            mask: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
            header: { borderBottom: '1px solid rgb(232, 232, 232)' },
            title: { fontWeight: 'bold' },
            extra: { color: 'rgb(255, 0, 0)' },
            section: { padding: '22px' },
            body: { color: 'rgb(0, 255, 0)' },
            footer: { color: 'rgb(255, 255, 0)' },
          };
    };

    const { container, rerender } = render(
      <Drawer
        open
        size="default"
        classNames={customClassNames}
        styles={customStyles}
        title="title"
        placement="right"
        footer={'Footer'}
        closable={false}
        getContainer={false}
        extra={'Cancel'}
      >
        test
      </Drawer>,
    );

    const rootElement = container.querySelector<HTMLElement>('.ant-drawer');
    const maskElement = container.querySelector<HTMLElement>('.ant-drawer-mask');
    const headerElement = container.querySelector<HTMLElement>('.ant-drawer-header');
    const titleElement = container.querySelector<HTMLElement>('.ant-drawer-title');
    const extraElement = container.querySelector<HTMLElement>('.ant-drawer-extra');
    const sectionElement = container.querySelector<HTMLElement>('.ant-drawer-section');
    const bodyElement = container.querySelector<HTMLElement>('.ant-drawer-body');
    const footerElement = container.querySelector<HTMLElement>('.ant-drawer-footer');

    // check classNames
    expect(rootElement).toHaveClass('custom-root-default');
    expect(maskElement).toHaveClass('custom-mask-default');
    expect(headerElement).toHaveClass('custom-header-default');
    expect(titleElement).toHaveClass('custom-title-default');
    expect(extraElement).toHaveClass('custom-extra-default');
    expect(sectionElement).toHaveClass('custom-section-default');
    expect(bodyElement).toHaveClass('custom-body-default');
    expect(footerElement).toHaveClass('custom-footer-default');

    // check styles
    expect(rootElement).toHaveStyle({ padding: '20px' });
    expect(maskElement).toHaveStyle({ 'background-color': 'rgba(0, 0, 0, 0.8)' });
    expect(headerElement).toHaveStyle({ 'border-bottom': '1px solid rgb(250, 250, 250)' });
    expect(titleElement).toHaveStyle({ 'font-weight': 'normal' });
    expect(extraElement).toHaveStyle({ color: 'rgb(0, 0, 255)' });
    expect(sectionElement).toHaveStyle({ padding: '18px' });
    expect(bodyElement).toHaveStyle({ color: 'rgb(0, 200, 0)' });
    expect(footerElement).toHaveStyle({ color: 'rgb(100, 0, 0)' });

    rerender(
      <Drawer
        open
        size="large"
        classNames={customClassNames}
        styles={customStyles}
        title="title"
        placement="right"
        footer={'Footer'}
        closable={false}
        getContainer={false}
        extra={'Cancel'}
      >
        test
      </Drawer>,
    );

    // check classNames
    expect(rootElement).toHaveClass('custom-root-large');
    expect(maskElement).toHaveClass('custom-mask-large');
    expect(headerElement).toHaveClass('custom-header-large');
    expect(titleElement).toHaveClass('custom-title-large');
    expect(extraElement).toHaveClass('custom-extra-large');
    expect(sectionElement).toHaveClass('custom-section-large');
    expect(bodyElement).toHaveClass('custom-body-large');
    expect(footerElement).toHaveClass('custom-footer-large');

    // check styles
    expect(rootElement).toHaveStyle({ padding: '24px' });
    expect(maskElement).toHaveStyle({ 'background-color': 'rgba(0, 0, 0, 0.5)' });
    expect(headerElement).toHaveStyle({ 'border-bottom': '1px solid rgb(232, 232, 232)' });
    expect(titleElement).toHaveStyle({ 'font-weight': 'bold' });
    expect(extraElement).toHaveStyle({ color: 'rgb(255, 0, 0)' });
    expect(sectionElement).toHaveStyle({ padding: '22px' });
    expect(bodyElement).toHaveStyle({ color: 'rgb(0, 255, 0)' });
    expect(footerElement).toHaveStyle({ color: 'rgb(255, 255, 0)' });
  });
});
