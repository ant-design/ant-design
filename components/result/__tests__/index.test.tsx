import React from 'react';

import Result from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render } from '../../../tests/utils';
import Button from '../../button';

describe('Result', () => {
  mountTest(Result);
  rtlTest(Result);

  it('🙂  successPercent should decide the progress status when it exists', () => {
    const { container } = render(
      <Result
        status="success"
        title="Successfully Purchased Cloud Server ECS!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Button type="primary" key="console">
            Go Console
          </Button>,
          <Button key="buy">Buy Again</Button>,
        ]}
      />,
    );
    expect(container.querySelectorAll('.anticon-check-circle')).toHaveLength(1);
  });

  it('🙂  different status, different class', () => {
    const { container, rerender } = render(<Result status="warning" />);
    expect(container.querySelectorAll('.ant-result-warning')).toHaveLength(1);

    rerender(<Result status="error" />);

    expect(container.querySelectorAll('.ant-result-error')).toHaveLength(1);

    rerender(<Result status="500" />);

    expect(container.querySelectorAll('.ant-result-500')).toHaveLength(1);
  });

  it('🙂  When status = 404, the icon is an image', () => {
    const { container } = render(<Result status="404" />);
    expect(container.querySelectorAll('.ant-result-404 .ant-result-image')).toHaveLength(1);
  });

  it('🙂  When extra is undefined, the extra dom is undefined', () => {
    const { container } = render(<Result status="404" />);
    expect(container.querySelectorAll('.ant-result-extra')).toHaveLength(0);
  });

  it('🙂  result should support className', () => {
    const { container } = render(<Result status="404" title="404" className="my-result" />);
    expect(container.querySelectorAll('.ant-result.my-result')).toHaveLength(1);
  });

  it('should warning when pass a string as icon props', () => {
    const warnSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<Result title="404" icon="ab" />);
    expect(warnSpy).not.toHaveBeenCalled();

    render(<Result title="404" icon="smile" />);
    expect(warnSpy).toHaveBeenCalledWith(
      `Warning: [antd: Result] \`icon\` is using ReactNode instead of string naming in v4. Please check \`smile\` at https://ant.design/components/icon`,
    );

    warnSpy.mockRestore();
  });

  it('should hide icon by setting icon to false or null', () => {
    const { container } = render(<Result title="404" icon={null} />);
    expect(container.querySelectorAll('.ant-result-icon')).toHaveLength(0);
    const { container: container2 } = render(<Result title="404" icon={false} />);
    expect(container2.querySelectorAll('.ant-result-icon')).toHaveLength(0);
  });

  it('should apply custom styles to Result', () => {
    const customClassNames = {
      root: 'custom-root',
      title: 'custom-title',
      subTitle: 'custom-subTitle',
      body: 'custom-body',
      extra: 'custom-extra',
      icon: 'custom-icon',
    };

    const customStyles = {
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
    expect(resultElement.classList).toContain('custom-root');
    expect(resultTitleElement.classList).toContain('custom-title');
    expect(resultSubTitleElement.classList).toContain('custom-subTitle');
    expect(resultBodyElement.classList).toContain('custom-body');
    expect(resultExtraElement.classList).toContain('custom-extra');
    expect(resultIconElement.classList).toContain('custom-icon');

    // check styles
    expect(resultElement.style.color).toBe('red');
    expect(resultTitleElement.style.color).toBe('green');
    expect(resultSubTitleElement.style.color).toBe('yellow');
    expect(resultBodyElement.style.color).toBe('blue');
    expect(resultExtraElement.style.backgroundColor).toBe('blue');
    expect(resultIconElement.style.backgroundColor).toBe('black');
  });

  it('should support style-class demo functionality', () => {
    const customClassNames = {
      root: 'custom-result-root',
      icon: 'custom-result-icon',
      title: 'custom-result-title',
      subTitle: 'custom-result-subtitle',
      body: 'custom-result-body',
      extra: 'custom-result-extra',
    };

    const customStyles = {
      root: {
        border: '2px solid #1890ff',
        borderRadius: '12px',
        backgroundColor: '#f0f8ff',
        padding: '24px',
      },
      icon: {
        color: '#1890ff',
        fontSize: '48px',
      },
      title: {
        color: '#1890ff',
        fontWeight: 'bold',
        fontSize: '24px',
      },
      subTitle: {
        color: '#666',
        fontStyle: 'italic',
        fontSize: '16px',
      },
      body: {
        backgroundColor: '#fafafa',
        padding: '16px',
        borderRadius: '8px',
        margin: '16px 0',
      },
      extra: {
        gap: '12px',
      },
    };

    const { container } = render(
      <Result
        status="success"
        title="Custom Styled Success Result"
        subTitle="This result demonstrates custom classNames and styles usage"
        classNames={customClassNames}
        styles={customStyles}
        extra={<div>Extra Action</div>}
      >
        <div>The content of the result with custom body styling.</div>
      </Result>,
    );

    const resultElement = container.querySelector('.ant-result') as HTMLElement;
    const resultIconElement = container.querySelector('.ant-result-icon') as HTMLElement;
    const resultTitleElement = container.querySelector('.ant-result-title') as HTMLElement;
    const resultSubTitleElement = container.querySelector('.ant-result-subtitle') as HTMLElement;
    const resultBodyElement = container.querySelector('.ant-result-body') as HTMLElement;
    const resultExtraElement = container.querySelector('.ant-result-extra') as HTMLElement;

    // Check custom classNames
    expect(resultElement.classList).toContain('custom-result-root');
    expect(resultIconElement.classList).toContain('custom-result-icon');
    expect(resultTitleElement.classList).toContain('custom-result-title');
    expect(resultSubTitleElement.classList).toContain('custom-result-subtitle');
    expect(resultBodyElement.classList).toContain('custom-result-body');
    expect(resultExtraElement.classList).toContain('custom-result-extra');

    // Check custom styles
    expect(resultElement.style.border).toBe('2px solid rgb(24, 144, 255)');
    expect(resultElement.style.borderRadius).toBe('12px');
    expect(resultElement.style.backgroundColor).toBe('rgb(240, 248, 255)');
    expect(resultElement.style.padding).toBe('24px');
    expect(resultIconElement.style.color).toBe('rgb(24, 144, 255)');
    expect(resultIconElement.style.fontSize).toBe('48px');
    expect(resultTitleElement.style.color).toBe('rgb(24, 144, 255)');
    expect(resultTitleElement.style.fontWeight).toBe('bold');
    expect(resultTitleElement.style.fontSize).toBe('24px');
    expect(resultSubTitleElement.style.color).toBe('rgb(102, 102, 102)');
    expect(resultSubTitleElement.style.fontStyle).toBe('italic');
    expect(resultSubTitleElement.style.fontSize).toBe('16px');
    expect(resultBodyElement.style.backgroundColor).toBe('rgb(250, 250, 250)');
    expect(resultBodyElement.style.padding).toBe('16px');
    expect(resultBodyElement.style.borderRadius).toBe('8px');
    expect(resultBodyElement.style.margin).toBe('16px 0px');
    expect(resultExtraElement.style.gap).toBe('12px');
  });
});
