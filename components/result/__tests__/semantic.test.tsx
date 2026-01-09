import React from 'react';

import type { ResultProps } from '..';
import Result from '..';
import { render } from '../../../tests/utils';

describe('Result.Semantic', () => {
  it('should apply custom styles to Result', () => {
    const customClassNames: ResultProps['classNames'] = {
      root: 'custom-root',
      title: 'custom-title',
      subTitle: 'custom-subTitle',
      body: 'custom-body',
      extra: 'custom-extra',
      icon: 'custom-icon',
    };

    const customStyles: ResultProps['styles'] = {
      root: { color: 'rgb(255, 0, 0)' },
      title: { color: 'rgb(0, 128, 0)' },
      subTitle: { color: 'rgb(255, 255, 0)' },
      body: { color: 'rgb(0, 0, 255)' },
      extra: { color: 'rgb(0, 255, 0)' },
      icon: { color: 'rgb(0, 0, 0)' },
    };

    const { container } = render(
      <Result
        title="title"
        subTitle="subTitle"
        extra={'extra'}
        classNames={customClassNames}
        styles={customStyles}
      >
        <div>The Content of Result</div>
      </Result>,
    );

    const resultElement = container.querySelector<HTMLElement>('.ant-result');
    const resultTitleElement = container.querySelector<HTMLElement>('.ant-result-title');
    const resultSubTitleElement = container.querySelector<HTMLElement>('.ant-result-subtitle');
    const resultBodyElement = container.querySelector<HTMLElement>('.ant-result-body');
    const resultExtraElement = container.querySelector<HTMLElement>('.ant-result-extra');
    const resultIconElement = container.querySelector<HTMLElement>('.ant-result-icon');

    // check classNames
    expect(resultElement).toHaveClass('custom-root');
    expect(resultTitleElement).toHaveClass('custom-title');
    expect(resultSubTitleElement).toHaveClass('custom-subTitle');
    expect(resultBodyElement).toHaveClass('custom-body');
    expect(resultExtraElement).toHaveClass('custom-extra');
    expect(resultIconElement).toHaveClass('custom-icon');

    // check styles
    expect(resultElement).toHaveStyle({ color: customStyles.root?.color });
    expect(resultTitleElement).toHaveStyle({ color: customStyles.title?.color });
    expect(resultSubTitleElement).toHaveStyle({ color: customStyles.subTitle?.color });
    expect(resultBodyElement).toHaveStyle({ color: customStyles.body?.color });
    expect(resultExtraElement).toHaveStyle({ color: customStyles.extra?.color });
    expect(resultIconElement).toHaveStyle({ color: customStyles.icon?.color });
  });

  it('should support function-based classNames and styles', () => {
    const classNamesFn: ResultProps['classNames'] = (info) => {
      if (info.props.status === 'success') {
        return { root: 'success-result' };
      }
      return { root: 'default-result' };
    };

    const stylesFn: ResultProps['styles'] = (info) => {
      if (info.props.status === 'error') {
        return { root: { backgroundColor: 'rgb(255, 0, 0)' } };
      }
      return { root: { backgroundColor: 'rgb(0, 128, 0)' } };
    };

    const { container, rerender } = render(
      <Result status="success" title="Success" classNames={classNamesFn} styles={stylesFn} />,
    );

    const resultElement = container.querySelector<HTMLElement>('.ant-result');
    expect(resultElement).toHaveClass('success-result');
    expect(resultElement).toHaveStyle({ backgroundColor: 'rgb(0, 128, 0)' });

    rerender(<Result status="error" title="Error" classNames={classNamesFn} styles={stylesFn} />);

    expect(resultElement).toHaveClass('default-result');
    expect(resultElement).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
  });
});
