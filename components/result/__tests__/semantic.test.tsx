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
    expect(resultElement).toHaveStyle({ color: 'red' });
    expect(resultTitleElement).toHaveStyle({ color: 'green' });
    expect(resultSubTitleElement).toHaveStyle({ color: 'yellow' });
    expect(resultBodyElement).toHaveStyle({ color: 'blue' });
    expect(resultExtraElement).toHaveStyle({ backgroundColor: 'blue' });
    expect(resultIconElement).toHaveStyle({ backgroundColor: 'black' });
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

    const resultElement = container.querySelector<HTMLElement>('.ant-result');
    expect(resultElement).toHaveClass('success-result');
    expect(resultElement).toHaveStyle({ backgroundColor: 'green' });

    rerender(<Result status="error" title="Error" classNames={classNamesFn} styles={stylesFn} />);

    expect(resultElement).toHaveClass('default-result');
    expect(resultElement).toHaveStyle({ backgroundColor: 'red' });
  });
});
