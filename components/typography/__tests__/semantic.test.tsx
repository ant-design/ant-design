import React from 'react';
import { clsx } from 'clsx';

import Typography from '..';
import { render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import type { TypographyClassNamesType, TypographyStylesType } from '../Base';

describe('Typography.Semantic', () => {
  it('should support classNames and styles for root, actions, and action', () => {
    const classNamesFn: TypographyClassNamesType = jest.fn(() => ({
      root: 'custom-typography',
      actions: 'custom-actions',
      action: 'custom-action',
    }));

    const stylesFn: TypographyStylesType = jest.fn(() => ({
      root: { color: '#1890ff' },
      actions: { backgroundColor: '#f0f0f0' },
      action: { padding: '5px' },
    }));

    const { rerender } = render(
      <Typography.Paragraph classNames={classNamesFn} styles={stylesFn} copyable>
        Test Typography
      </Typography.Paragraph>,
    );

    expect(classNamesFn).toHaveBeenCalled();
    expect(stylesFn).toHaveBeenCalled();

    const rootElement = document.querySelector<HTMLElement>('.ant-typography');
    expect(rootElement).toHaveClass('custom-typography');
    expect(rootElement).toHaveStyle({ color: 'rgb(24, 144, 255)' });

    const actionsElement = document.querySelector<HTMLElement>('.ant-typography-actions');
    expect(actionsElement).toHaveClass('custom-actions');
    expect(actionsElement).toHaveStyle({ backgroundColor: 'rgb(240, 240, 240)' });

    const actionButton = document.querySelector<HTMLElement>('.ant-typography-actions button');
    expect(actionButton).toHaveClass('custom-action');
    expect(actionButton).toHaveStyle({ padding: '5px' });

    rerender(
      <Typography.Paragraph
        classNames={{
          root: 'obj-root',
          actions: 'obj-actions',
          action: 'obj-action',
        }}
        styles={{
          root: { fontSize: '16px', color: '#52c41a' },
          actions: { margin: '10px' },
          action: { borderRadius: '4px' },
        }}
        copyable
      >
        Updated Typography
      </Typography.Paragraph>,
    );

    const updatedRootElement = document.querySelector<HTMLElement>('.ant-typography');
    expect(updatedRootElement).toHaveClass('obj-root');
    expect(updatedRootElement).toHaveStyle({ fontSize: '16px', color: 'rgb(82, 196, 26)' });

    const updatedActionsElement = document.querySelector<HTMLElement>('.ant-typography-actions');
    expect(updatedActionsElement).toHaveClass('obj-actions');
    expect(updatedActionsElement).toHaveStyle({ margin: '10px' });

    const updatedActionButton = document.querySelector<HTMLElement>(
      '.ant-typography-actions button',
    );
    expect(updatedActionButton).toHaveClass('obj-action');
    expect(updatedActionButton).toHaveStyle({ borderRadius: '4px' });
  });

  it('should merge context and component classNames and styles', () => {
    const contextClassNames: TypographyClassNamesType = {
      root: 'context-root',
      actions: 'context-actions',
    };
    const contextStyles: TypographyStylesType = {
      root: { padding: '10px' },
      actions: { margin: '5px' },
    };
    const componentClassNames: TypographyClassNamesType = {
      root: 'component-root',
    };
    const componentStyles: TypographyStylesType = {
      root: { fontSize: '14px' },
    };

    render(
      <ConfigProvider>
        <ConfigProvider
          typography={{
            className: undefined,
            style: undefined,
            classNames: contextClassNames,
            styles: contextStyles,
          }}
        >
          <Typography.Paragraph classNames={componentClassNames} styles={componentStyles} copyable>
            Test Typography
          </Typography.Paragraph>
        </ConfigProvider>
      </ConfigProvider>,
    );

    const rootElement = document.querySelector<HTMLElement>('.ant-typography');
    const actionsElement = document.querySelector<HTMLElement>('.ant-typography-actions');

    expect(rootElement).toHaveClass(clsx(contextClassNames.root, componentClassNames.root));
    expect(actionsElement).toHaveClass(contextClassNames.actions!);

    expect(rootElement).toHaveStyle({
      padding: contextStyles.root?.padding,
      fontSize: componentStyles.root?.fontSize,
    });
    expect(actionsElement).toHaveStyle({ margin: contextStyles.actions?.margin });
  });
});
