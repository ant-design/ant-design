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
      root: { color: 'red' },
      title: { color: 'green' },
      subTitle: { color: 'yellow' },
      body: { color: 'blue' },
      extra: { backgroundColor: 'blue' },
      icon: { backgroundColor: 'black' },
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

    const resultElement = container.querySelector('.ant-result') as HTMLElement;
    const resultTitleElement = container.querySelector('.ant-result-title') as HTMLElement;
    const resultSubTitleElement = container.querySelector('.ant-result-subtitle') as HTMLElement;
    const resultBodyElement = container.querySelector('.ant-result-body') as HTMLElement;
    const resultExtraElement = container.querySelector('.ant-result-extra') as HTMLElement;
    const resultIconElement = container.querySelector('.ant-result-icon') as HTMLElement;

    // check classNames
    expect(resultElement).toHaveClass('custom-root');
    expect(resultTitleElement).toHaveClass('custom-title');
    expect(resultSubTitleElement).toHaveClass('custom-subTitle');
    expect(resultBodyElement).toHaveClass('custom-body');
    expect(resultExtraElement).toHaveClass('custom-extra');
    expect(resultIconElement).toHaveClass('custom-icon');

    // check styles
    expect(resultElement.style.color).toBe('red');
    expect(resultTitleElement.style.color).toBe('green');
    expect(resultSubTitleElement.style.color).toBe('yellow');
    expect(resultBodyElement.style.color).toBe('blue');
    expect(resultExtraElement.style.backgroundColor).toBe('blue');
    expect(resultIconElement.style.backgroundColor).toBe('black');
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
        return { root: { backgroundColor: 'red' } };
      }
      return { root: { backgroundColor: 'green' } };
    };

    const { container, rerender } = render(
      <Result status="success" title="Success" classNames={classNamesFn} styles={stylesFn} />,
    );

    const resultElement = container.querySelector('.ant-result') as HTMLElement;
    expect(resultElement).toHaveClass('success-result');
    expect(resultElement.style.backgroundColor).toBe('green');

    rerender(<Result status="error" title="Error" classNames={classNamesFn} styles={stylesFn} />);

    expect(resultElement).toHaveClass('default-result');
    expect(resultElement.style.backgroundColor).toBe('red');
  });
});
