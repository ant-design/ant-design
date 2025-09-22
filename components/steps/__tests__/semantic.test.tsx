import React from 'react';

import Steps from '..';
import type { StepsProps } from '..';
import type { GetProp } from '../../_util/type';
import { render } from '../../../tests/utils';

type SemanticName = keyof GetProp<StepsProps, 'classNames'>;

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
    const classNames: Record<SemanticName, string> = {
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

    const classNamesTargets: Record<SemanticName, string> = {
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

    const styles: Record<SemanticName, Record<string, any>> = {
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

    const { container } = render(
      renderSteps({
        classNames,
        styles,
      }),
    );

    Object.keys(classNames).forEach((key) => {
      const className = classNames[key as SemanticName];
      const oriClassName = classNamesTargets[key as SemanticName];
      const style = styles[key as SemanticName];

      const element = container.querySelector<HTMLElement>(`.${className}`);
      expect(element).toBeTruthy();
      expect(element).toHaveClass(oriClassName);
      expect(element).toHaveStyle(style);
    });
  });
});
