import React from 'react';
import { clsx } from 'clsx';

import Typography from '..';
import { render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import type { TypographyClassNamesType, TypographyStylesType } from '../Base';

describe('Typography.Semantic', () => {
  it('should support classNames and styles as functions', () => {
    const classNamesFn: TypographyClassNamesType = jest.fn(() => {
      return { root: 'custom-typography' };
    });

    const stylesFn: TypographyStylesType = jest.fn(() => {
      return { root: { color: '#1890ff' } };
    });

    const { rerender } = render(
      <Typography classNames={classNamesFn} styles={stylesFn}>
        Test Typography
      </Typography>,
    );

    expect(classNamesFn).toHaveBeenCalled();
    expect(stylesFn).toHaveBeenCalled();

    const rootElement = document.querySelector<HTMLElement>('.ant-typography');
    expect(rootElement).toHaveClass('custom-typography');
    expect(rootElement).toHaveStyle({ color: 'rgb(24, 144, 255)' });

    rerender(
      <Typography classNames={classNamesFn} styles={stylesFn}>
        Updated Typography
      </Typography>,
    );

    const updatedRootElement = document.querySelector<HTMLElement>('.ant-typography');
    expect(updatedRootElement).toHaveClass('custom-typography');
    expect(updatedRootElement).toHaveStyle({ color: 'rgb(24, 144, 255)' });
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
          typography={
            {
              className: undefined,
              style: undefined,
              classNames: contextClassNames,
              styles: contextStyles,
            } as any
          }
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

  it('should support semantic className and style on actions', () => {
    render(
      <Typography.Paragraph
        classNames={{ actions: 'custom-actions' }}
        styles={{ actions: { backgroundColor: '#f0f0f0' } }}
        copyable
      >
        Test Typography with Action
      </Typography.Paragraph>,
    );

    const rootElement = document.querySelector<HTMLElement>('.ant-typography');
    expect(rootElement).toBeInTheDocument();

    const actionsElement = document.querySelector<HTMLElement>('.ant-typography-actions');
    expect(actionsElement).toHaveClass('custom-actions');
    expect(actionsElement).toHaveStyle({ backgroundColor: 'rgb(240, 240, 240)' });
  });
});
