import React, { useRef } from 'react';

import Tour from '..';
import type { TourProps } from '../interface';
import { render } from '../../../tests/utils';

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

    const Demo = () => {
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

    const maskElement = document.querySelector('.ant-tour-mask') as HTMLElement;
    const sectionElement = document.querySelector('.ant-tour-section') as HTMLElement;
    const titleElement = document.querySelector('.ant-tour-title') as HTMLElement;
    const headerElement = document.querySelector('.ant-tour-header') as HTMLElement;
    const footerElement = document.querySelector('.ant-tour-footer') as HTMLElement;
    const descriptionElement = document.querySelector('.ant-tour-description') as HTMLElement;
    const coverElement = document.querySelector('.ant-tour-cover') as HTMLElement;
    const indicatorElement = document.querySelector('.ant-tour-indicator') as HTMLElement;
    const indicatorsElement = document.querySelector('.ant-tour-indicators') as HTMLElement;
    const rootElement = document.querySelector('.ant-tour-mask') as HTMLElement;

    // className assertions
    expect(maskElement.classList.contains('primary-mask-fn')).toBeTruthy();
    expect(sectionElement.classList.contains('custom-section-fn')).toBeTruthy();
    expect(titleElement.classList.contains('custom-title-fn')).toBeTruthy();
    expect(headerElement.classList.contains('custom-header-fn')).toBeTruthy();
    expect(footerElement.classList.contains('primary-footer-fn')).toBeTruthy();
    expect(descriptionElement.classList.contains('custom-description-fn')).toBeTruthy();
    expect(coverElement.classList.contains('custom-cover-fn')).toBeTruthy();
    expect(indicatorElement.classList.contains('custom-indicator-fn')).toBeTruthy();
    expect(indicatorsElement.classList.contains('custom-indicators-fn')).toBeTruthy();
    expect(rootElement.classList.contains('custom-root-fn')).toBeTruthy();

    // style assertions via computed style
    expect(getComputedStyle(maskElement).color).toBe('rgb(255, 255, 255)');
    expect(sectionElement.style.margin).toBe('10px');
    expect(
      getComputedStyle(sectionElement).borderRadius || getComputedStyle(sectionElement).margin,
    ).toBeDefined();
    expect(getComputedStyle(titleElement).fontSize).toBe('20px');
    expect(getComputedStyle(headerElement).backgroundColor).toBe('rgb(128, 128, 128)');
    expect(getComputedStyle(footerElement).borderTopWidth).toBe('1px');
    expect(getComputedStyle(descriptionElement).fontStyle).toBe('italic');
    expect(getComputedStyle(coverElement).color).toBe('rgb(255, 0, 0)');
    expect(getComputedStyle(indicatorElement).color).toBe('rgb(0, 128, 0)');
    expect(getComputedStyle(indicatorsElement).color).toBe('rgb(255, 255, 0)');
    expect(getComputedStyle(rootElement).backgroundColor).toBe('rgb(255, 255, 0)');
  });
});
