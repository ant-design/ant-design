import React from 'react';

import Steps from '..';
import type { StepsProps, StepsSemanticName } from '..';
import type { SemanticClassNames } from '../../_util/hooks';
import { render } from '../../../tests/utils';

describe('Steps.Semantic', () => {
  const renderSteps = (props: Partial<StepsProps>) => (
    <Steps
      items={Array.from({ length: 3 }, (_, index) => ({
        title: `Step ${index + 1}`,
        subTitle: `SubTitle ${index + 1}`,
        description: `Description ${index + 1}`,
      }))}
      {...props}
    />
  );

  it('semantic structure', () => {
    const classNames: SemanticClassNames<StepsSemanticName> = {
      root: 'custom-root',
      item: 'custom-item',
      itemWrapper: 'custom-item-wrapper',
      itemIcon: 'custom-item-icon',
      itemSection: 'custom-item-section',
      itemHeader: 'custom-item-header',
      itemTitle: 'custom-item-title',
      itemSubtitle: 'custom-item-subtitle',
      itemContent: 'custom-item-content',
      itemRail: 'custom-item-rail',
    };

    const classNamesTargets: Required<SemanticClassNames<StepsSemanticName>> = {
      root: 'ant-steps',
      item: 'ant-steps-item',
      itemWrapper: 'ant-steps-item-wrapper',
      itemIcon: 'ant-steps-item-icon',
      itemSection: 'ant-steps-item-section',
      itemHeader: 'ant-steps-item-header',
      itemTitle: 'ant-steps-item-title',
      itemSubtitle: 'ant-steps-item-subtitle',
      itemContent: 'ant-steps-item-content',
      itemRail: 'ant-steps-item-rail',
    };

    const styles: Record<StepsSemanticName, Record<string, any>> = {
      root: { color: 'rgb(255, 0, 0)' },
      item: { color: 'rgb(0, 0, 255)' },
      itemWrapper: { color: 'rgb(0, 255, 0)' },
      itemIcon: { color: 'rgb(255, 255, 0)' },
      itemSection: { color: 'rgb(128, 0, 128)' },
      itemHeader: { color: 'rgb(255, 165, 0)' },
      itemTitle: { color: 'rgb(255, 192, 203)' },
      itemSubtitle: { color: 'rgb(0, 255, 255)' },
      itemContent: { color: 'rgb(255, 0, 255)' },
      itemRail: { color: 'rgb(0, 255, 0)' },
    };

    const { container } = render(renderSteps({ classNames, styles }));

    Object.keys(classNames).forEach((key) => {
      const className = classNames[key as StepsSemanticName];
      const oriClassName = classNamesTargets[key as StepsSemanticName];
      const style = styles[key as StepsSemanticName];

      const element = container.querySelector<HTMLElement>(`.${className}`);
      expect(element).toBeTruthy();
      expect(element).toHaveClass(oriClassName);
      expect(element).toHaveStyle(style);
    });
  });

  it('semantic structure with function classNames and styles', () => {
    const classNamesFn: StepsProps['classNames'] = (info) => {
      if (info.props.type === 'navigation') {
        return { root: 'custom-navigation-root' };
      }
      return { root: 'custom-default-root' };
    };

    const stylesFn: StepsProps['styles'] = (info) => {
      if (info.props.current === 1) {
        return { root: { backgroundColor: 'rgb(255, 0, 0)' } };
      }
      return { root: { backgroundColor: 'rgb(0, 255, 0)' } };
    };

    const { container } = render(
      renderSteps({
        type: 'navigation',
        current: 1,
        classNames: classNamesFn,
        styles: stylesFn,
      }),
    );

    const rootElement = container.querySelector<HTMLElement>('.custom-navigation-root');
    expect(rootElement).toBeTruthy();
    expect(rootElement).toHaveClass('ant-steps');
    expect(rootElement).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
  });
});
