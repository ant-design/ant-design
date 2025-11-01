import React from 'react';
import { render } from '@testing-library/react';

import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import Badge from '../index';

describe('Ribbon', () => {
  mountTest(Badge.Ribbon);
  rtlTest(Badge.Ribbon);

  describe('placement', () => {
    it('works with `start` & `end` placement', () => {
      const { container: wrapperStart } = render(
        <Badge.Ribbon placement="start">
          <div />
        </Badge.Ribbon>,
      );
      expect(wrapperStart.querySelectorAll('.ant-ribbon-placement-start').length).toEqual(1);

      const { container: wrapperEnd } = render(
        <Badge.Ribbon placement="end">
          <div />
        </Badge.Ribbon>,
      );
      expect(wrapperEnd.querySelectorAll('.ant-ribbon-placement-end').length).toEqual(1);
    });
  });

  describe('color', () => {
    it('works with preset color', () => {
      const { container } = render(
        <Badge.Ribbon color="green">
          <div />
        </Badge.Ribbon>,
      );
      expect(container.querySelectorAll('.ant-ribbon-color-green').length).toEqual(1);
    });
    it('works with custom color', () => {
      const { container, rerender } = render(
        <Badge.Ribbon color="rgb(136, 136, 136)" placement="start">
          <div />
        </Badge.Ribbon>,
      );
      expect(container.querySelector<HTMLElement>('.ant-ribbon')).toHaveStyle({
        backgroundColor: 'rgb(136, 136, 136)',
      });
      expect(container.querySelector<HTMLElement>('.ant-ribbon-corner')).toHaveStyle({
        color: 'rgb(136, 136, 136)',
      });
      rerender(
        <Badge.Ribbon color="rgb(136, 136, 136)" placement="end">
          <div />
        </Badge.Ribbon>,
      );
      expect(container.querySelector<HTMLElement>('.ant-ribbon')).toHaveStyle({
        backgroundColor: 'rgb(136, 136, 136)',
      });
      expect(container.querySelector<HTMLElement>('.ant-ribbon-corner')).toHaveStyle({
        color: 'rgb(136, 136, 136)',
      });
    });
  });

  describe('text', () => {
    it('works with string', () => {
      const { container } = render(
        <Badge.Ribbon text="cool">
          <div />
        </Badge.Ribbon>,
      );
      expect(container.querySelector('.ant-ribbon')?.textContent).toEqual('cool');
    });
    it('works with element', () => {
      const { container } = render(
        <Badge.Ribbon text={<span className="cool" />}>
          <div />
        </Badge.Ribbon>,
      );
      expect(container.querySelectorAll('.cool').length).toEqual(1);
    });
  });
  it('should apply custom styles to Badge.Ribbon', () => {
    const customClassNames = {
      root: 'custom-root',
      indicator: 'custom-indicator',
      content: 'custom-content',
    };

    const customStyles = {
      root: { color: 'rgb(255, 0, 0)' },
      indicator: { color: 'rgb(0, 128, 0)' },
      content: { color: 'rgb(255, 255, 0)' },
    };

    const { container } = render(
      <Badge.Ribbon text="Hippies" color="pink" classNames={customClassNames} styles={customStyles}>
        <div>and raises the spyglass.</div>
      </Badge.Ribbon>,
    );

    const rootElement = container.querySelector<HTMLElement>('.ant-ribbon-wrapper');
    const indicatorElement = container.querySelector<HTMLElement>('.ant-ribbon');
    const contentElement = container.querySelector<HTMLElement>('.ant-ribbon-content');

    // check classNames
    expect(rootElement).toHaveClass('custom-root');
    expect(indicatorElement).toHaveClass('custom-indicator');
    expect(contentElement).toHaveClass('custom-content');

    // check styles
    expect(rootElement).toHaveStyle({ color: 'rgb(255, 0, 0)' });
    expect(indicatorElement).toHaveStyle({ color: 'rgb(0, 128, 0)' });
    expect(contentElement).toHaveStyle({ color: 'rgb(255, 255, 0)' });
  });

  it('should support function-based classNames and styles', () => {
    const { container } = render(
      <Badge.Ribbon
        text="Test"
        color="blue"
        placement="start"
        classNames={({ props }) => ({
          root: `ribbon-${props.placement}`,
          indicator: 'ribbon-indicator',
          content: 'ribbon-content',
        })}
        styles={({ props }) => ({
          root: {
            border:
              props.placement === 'start' ? '1px solid rgb(255, 0, 0)' : '1px solid rgb(0, 0, 255)',
          },
          indicator: { opacity: '0.8' },
          content: { fontWeight: 'bold' },
        })}
      >
        <div>Test content</div>
      </Badge.Ribbon>,
    );

    const rootElement = container.querySelector<HTMLElement>('.ant-ribbon-wrapper');
    const indicatorElement = container.querySelector<HTMLElement>('.ant-ribbon');
    const contentElement = container.querySelector<HTMLElement>('.ant-ribbon-content');

    // check function-based classNames
    expect(rootElement).toHaveClass('ribbon-start');
    expect(indicatorElement).toHaveClass('ribbon-indicator');
    expect(contentElement).toHaveClass('ribbon-content');

    // check function-based styles
    expect(rootElement).toHaveStyle({ border: '1px solid rgb(255, 0, 0)' });
    expect(indicatorElement).toHaveStyle({ opacity: '0.8' });
    expect(contentElement).toHaveStyle({ fontWeight: 'bold' });
  });
});
