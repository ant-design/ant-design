import React from 'react';

import Tooltip from '..';
import type { TooltipProps } from '..';
import { render } from '../../../tests/utils';
import {
  expectSemanticRootStylePriority,
  semanticRootStylePriority,
} from '../../../tests/shared/semanticStylePriority';
import ConfigProvider from '../../config-provider';

describe('Tooltip.Semantic', () => {
  it('should support static classNames and styles', () => {
    const classNames: TooltipProps['classNames'] = {
      root: 'custom-root',
      container: 'custom-container',
    };

    const styles: TooltipProps['styles'] = {
      root: { backgroundColor: 'red' },
      container: { color: 'blue' },
    };

    const { container } = render(
      <Tooltip title="Test tooltip" classNames={classNames} styles={styles} open>
        Test
      </Tooltip>,
    );

    const tooltipElement = container.querySelector('.ant-tooltip');
    const tooltipInner = container.querySelector('.ant-tooltip-container');

    expect(tooltipElement).toHaveClass(classNames.root!);
    expect(tooltipInner).toHaveClass(classNames.container!);
    expect(tooltipElement).toHaveStyle('background-color: rgb(255, 0, 0)');
    expect(tooltipInner).toHaveStyle('color: rgb(0, 0, 255)');
  });

  it('should support function-based classNames and styles', () => {
    const classNames: TooltipProps['classNames'] = (info) => {
      if (info.props.color === 'blue') {
        return { root: 'blue-tooltip' };
      }
      return { root: 'default-tooltip' };
    };

    const styles: TooltipProps['styles'] = (info) => {
      if (info.props.placement === 'top') {
        return { container: { fontSize: '16px' } };
      }
      return { container: { fontSize: '14px' } };
    };

    const { container } = render(
      <Tooltip
        title="Test tooltip"
        color="blue"
        placement="top"
        classNames={classNames}
        styles={styles}
        open
      >
        Test
      </Tooltip>,
    );

    const tooltipElement = container.querySelector('.ant-tooltip');
    const tooltipContainer = container.querySelector('.ant-tooltip-container');

    expect(tooltipElement).toHaveClass('blue-tooltip');
    expect(tooltipContainer).toHaveStyle('font-size: 16px');
  });

  it('should allow backdrop-filter while preserving popup elevation', () => {
    const { container } = render(
      <Tooltip
        open
        title="Test tooltip"
        styles={{
          container: {
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(12px)',
          },
        }}
      >
        Trigger
      </Tooltip>,
    );

    const root = container.querySelector('.ant-tooltip');
    const tooltipContainer = container.querySelector('.ant-tooltip-container');
    const arrow = container.querySelector('.ant-tooltip-arrow');

    expect(tooltipContainer).toHaveStyle({ backgroundColor: 'rgba(255, 255, 255, 0.4)' });
    expect(getComputedStyle(root!).filter || 'none').toBe('none');
    expect(getComputedStyle(tooltipContainer!).filter).toBe('var(--ant-drop-shadow-popover)');
    expect(tooltipContainer).toContainElement(arrow);
  });

  it('should follow root style priority', () => {
    const { container } = render(
      <ConfigProvider
        tooltip={{
          styles: semanticRootStylePriority.contextStyles,
          style: semanticRootStylePriority.contextStyle,
        }}
      >
        <Tooltip
          title="Test tooltip"
          open
          styles={semanticRootStylePriority.styles}
          overlayStyle={semanticRootStylePriority.style}
        >
          Test
        </Tooltip>
      </ConfigProvider>,
    );

    expectSemanticRootStylePriority(container.querySelector('.ant-tooltip'));
  });
});
