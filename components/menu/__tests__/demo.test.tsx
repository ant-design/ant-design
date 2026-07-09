import * as React from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';

import { render } from '../../../tests/utils';

import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';
import { TriggerMockContext } from '../../../tests/shared/demoTestContext';
import ConfigProvider from '../../config-provider';
import theme from '../../theme';

demoTest('menu', { testRootProps: false });

it('renders scrollable submenu demo', () => {
  const Demo = jest.requireActual('../demo/scrollable-submenu').default;

  render(
    <TriggerMockContext.Provider value={{ popupVisible: true }}>
      <Demo />
    </TriggerMockContext.Provider>,
  );

  const submenuList = Array.from(
    document.querySelectorAll<HTMLElement>('.ant-menu-submenu-popup .ant-menu-sub'),
  ).find((element) => getComputedStyle(element).maxHeight === '256px');

  expect(submenuList).toBeTruthy();
});

it('uses popup background for Select-like scroll fade under dark algorithm', () => {
  const Demo = jest.requireActual('../demo/scrollable-submenu').default;
  const cache = createCache();

  render(
    <StyleProvider cache={cache}>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <TriggerMockContext.Provider value={{ popupVisible: true }}>
          <Demo />
        </TriggerMockContext.Provider>
      </ConfigProvider>
    </StyleProvider>,
  );

  const styleText = extractStyle(cache, { plain: true });
  const fadeRootRule = styleText
    .split('}')
    .find(
      (rule) =>
        rule.includes('.ant-menu-submenu-popup .ant-menu-vertical.ant-menu-sub') &&
        rule.includes('position:relative'),
    );
  const fadeBeforeRule = styleText
    .split('}')
    .find(
      (rule) =>
        rule.includes('.ant-menu-submenu-popup .ant-menu-vertical.ant-menu-sub') &&
        rule.includes('::before') &&
        rule.includes('background-image:'),
    );
  const fadeSharedPseudoRule = styleText
    .split('}')
    .find(
      (rule) =>
        rule.includes('.ant-menu-submenu-popup .ant-menu-vertical.ant-menu-sub') &&
        rule.includes('::before') &&
        rule.includes('::after') &&
        rule.includes('height:'),
    );
  const fadeTimelineRule = styleText
    .split('}')
    .find(
      (rule) =>
        rule.includes('.ant-menu-submenu-popup .ant-menu-vertical.ant-menu-sub') &&
        rule.includes('::before') &&
        rule.includes('animation-timeline:scroll(nearest block)'),
    );

  expect(fadeRootRule).toBeTruthy();
  expect(fadeSharedPseudoRule).toContain('height:var(--ant-control-height-lg)');
  expect(fadeBeforeRule).toContain('margin-block-end:calc(-1 * var(--ant-control-height-lg))');
  expect(fadeBeforeRule).toContain(
    'linear-gradient(to bottom in oklab, var(--ant-menu-popup-bg), transparent)',
  );
  expect(fadeTimelineRule).toContain('animation-range:0 var(--ant-control-height-lg)');
  expect(fadeSharedPseudoRule).not.toContain('var(--ant-padding-lg)');
  expect(fadeBeforeRule).not.toContain('var(--ant-padding-lg)');
  expect(fadeTimelineRule).not.toContain('var(--ant-padding-lg)');
  expect(fadeRootRule).not.toContain('background-attachment:local,local,scroll,scroll');
});

rootPropsTest(
  'menu',
  (Menu, props) => (
    <Menu
      {...props}
      mode="vertical"
      openKeys={['lbl2']}
      items={[
        {
          label: 'Label 1',
          key: 'lbl1',
        },
        {
          label: 'Label 2',
          key: 'lbl2',
          children: [
            {
              label: 'Label 3',
              key: 'lbl3',
            },
          ],
        },
      ]}
    />
  ),
  {
    findRootElements: (container) =>
      container.querySelectorAll('.ant-menu-root, .ant-menu-submenu-popup'),
  },
);
