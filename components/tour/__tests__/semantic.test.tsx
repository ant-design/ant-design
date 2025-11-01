import React, { useRef } from 'react';

import Tour from '..';
import { render } from '../../../tests/utils';
import type { TourProps } from '../interface';

describe('Tour.Semantic', () => {
  it('support custom styles as function', () => {
    const customClassnames: TourProps['classNames'] = (_info) => ({
      mask: _info?.props.type === 'primary' ? 'primary-mask-fn' : 'primary-mask-fn',
      actions: 'custom-actions-fn',
      title: 'custom-title-fn',
      header: 'custom-header-fn',
      section: 'custom-section-fn',
      footer: _info?.props.type === 'primary' ? 'primary-footer-fn' : 'custom-footer-fn',
      description: 'custom-description-fn',
      cover: 'custom-cover-fn',
      indicator: 'custom-indicator-fn',
      indicators: 'custom-indicators-fn',
      root: 'custom-root-fn',
    });

    const customStyles: TourProps['styles'] = (_info) => ({
      mask: { color: _info?.props.type === 'primary' ? 'white' : 'black' },
      actions: { color: 'blue' },
      title: { fontSize: '20px' },
      header: { backgroundColor: 'gray' },
      section: { margin: _info?.props.type === 'primary' ? '10px' : '5px' },
      footer: { borderTop: '1px solid black' },
      description: { fontStyle: 'italic' },
      cover: { color: 'red' },
      indicator: { color: 'green' },
      indicators: { color: 'yellow' },
      root: { backgroundColor: 'yellow' },
    });

    const Demo: React.FC = () => {
      const btnRef = useRef<HTMLButtonElement>(null);
      return (
        <div style={{ margin: 20 }}>
          <button ref={btnRef} type="button">
            按钮
          </button>
          <Tour
            classNames={customClassnames}
            styles={customStyles}
            open
            type="primary"
            steps={[
              {
                title: '创建',
                description: '创建一条数据',
                cover: (
                  <img
                    alt="tour.png"
                    src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
                  />
                ),
                target: () => btnRef.current!,
              },
              {
                title: 'Save',
                description: 'Save your changes.',
                target: () => btnRef.current!,
              },
            ]}
          />
        </div>
      );
    };

    render(<Demo />);

    const maskElement = document.querySelector<HTMLElement>('.ant-tour-mask');
    const sectionElement = document.querySelector<HTMLElement>('.ant-tour-section');
    const titleElement = document.querySelector<HTMLElement>('.ant-tour-title');
    const headerElement = document.querySelector<HTMLElement>('.ant-tour-header');
    const footerElement = document.querySelector<HTMLElement>('.ant-tour-footer');
    const descriptionElement = document.querySelector<HTMLElement>('.ant-tour-description');
    const coverElement = document.querySelector<HTMLElement>('.ant-tour-cover');
    const indicatorElement = document.querySelector<HTMLElement>('.ant-tour-indicator');
    const indicatorsElement = document.querySelector<HTMLElement>('.ant-tour-indicators');
    const rootElement = document.querySelector<HTMLElement>('.ant-tour-mask');

    // className assertions
    expect(maskElement).toHaveClass('primary-mask-fn');
    expect(sectionElement).toHaveClass('custom-section-fn');
    expect(titleElement).toHaveClass('custom-title-fn');
    expect(headerElement).toHaveClass('custom-header-fn');
    expect(footerElement).toHaveClass('primary-footer-fn');
    expect(descriptionElement).toHaveClass('custom-description-fn');
    expect(coverElement).toHaveClass('custom-cover-fn');
    expect(indicatorElement).toHaveClass('custom-indicator-fn');
    expect(indicatorsElement).toHaveClass('custom-indicators-fn');
    expect(rootElement).toHaveClass('custom-root-fn');

    // style assertions via computed style
    expect(maskElement).toHaveStyle({ color: 'rgb(255, 255, 255)' });
    expect(sectionElement).toHaveStyle({ margin: '10px' });
    expect(titleElement).toHaveStyle({ fontSize: '20px' });
    expect(headerElement).toHaveStyle({ backgroundColor: 'rgb(128, 128, 128)' });
    expect(footerElement).toHaveStyle({ borderTopWidth: '1px' });
    expect(descriptionElement).toHaveStyle({ fontStyle: 'italic' });
    expect(coverElement).toHaveStyle({ color: 'rgb(255, 0, 0)' });
    expect(indicatorElement).toHaveStyle({ color: 'rgb(0, 128, 0)' });
    expect(indicatorsElement).toHaveStyle({ color: 'rgb(255, 255, 0)' });
    expect(rootElement).toHaveStyle({ backgroundColor: 'rgb(255, 255, 0)' });
  });
});
