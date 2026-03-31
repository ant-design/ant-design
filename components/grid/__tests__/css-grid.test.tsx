import React from 'react';

import { ConfigProvider } from '../..';
import CSSGrid from '../css-grid';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render } from '../../../tests/utils';

describe('CSSGrid', () => {
  mountTest(() => (
    <CSSGrid>
      <div>test1</div>
      <div>test2</div>
    </CSSGrid>
  ));

  rtlTest(() => (
    <CSSGrid>
      <div>test1</div>
      <div>test2</div>
    </CSSGrid>
  ));

  it('renders correctly', () => {
    const { container } = render(<CSSGrid>test</CSSGrid>);
    expect(container.querySelector('.ant-css-grid')).toBeTruthy();
  });

  describe('Props: templateColumns', () => {
    it('support string', () => {
      const { container } = render(<CSSGrid templateColumns="repeat(3, 1fr)">test</CSSGrid>);
      expect(container.querySelector('.ant-css-grid')).toHaveStyle({
        gridTemplateColumns: 'repeat(3, 1fr)',
      });
    });
  });

  describe('Props: gap', () => {
    it('support number', () => {
      const { container } = render(<CSSGrid gap={16}>test</CSSGrid>);
      expect(container.querySelector('.ant-css-grid')).toHaveStyle({
        gap: '16px',
      });
    });

    it('support string', () => {
      const { container } = render(<CSSGrid gap="16px">test</CSSGrid>);
      expect(container.querySelector('.ant-css-grid')).toHaveStyle({
        gap: '16px',
      });
    });

    it('support preset size small', () => {
      const { container } = render(<CSSGrid gap="small">test</CSSGrid>);
      expect(container.querySelector('.ant-css-grid')).toHaveClass('ant-css-grid-gap-small');
    });

    it('support preset size middle', () => {
      const { container } = render(<CSSGrid gap="middle">test</CSSGrid>);
      expect(container.querySelector('.ant-css-grid')).toHaveClass('ant-css-grid-gap-middle');
    });

    it('support preset size large', () => {
      const { container } = render(<CSSGrid gap="large">test</CSSGrid>);
      expect(container.querySelector('.ant-css-grid')).toHaveClass('ant-css-grid-gap-large');
    });
  });

  describe('Props: rowGap', () => {
    it('support number', () => {
      const { container } = render(<CSSGrid rowGap={8}>test</CSSGrid>);
      expect(container.querySelector('.ant-css-grid')).toHaveStyle({
        rowGap: '8px',
      });
    });

    it('support preset size', () => {
      const { container } = render(<CSSGrid rowGap="small">test</CSSGrid>);
      expect(container.querySelector('.ant-css-grid')).toHaveClass('ant-css-grid-row-gap-small');
    });
  });

  describe('Props: columnGap', () => {
    it('support number', () => {
      const { container } = render(<CSSGrid columnGap={8}>test</CSSGrid>);
      expect(container.querySelector('.ant-css-grid')).toHaveStyle({
        columnGap: '8px',
      });
    });

    it('support preset size', () => {
      const { container } = render(<CSSGrid columnGap="small">test</CSSGrid>);
      expect(container.querySelector('.ant-css-grid')).toHaveClass('ant-css-grid-column-gap-small');
    });
  });

  describe('Props: alignment', () => {
    it('support justifyItems', () => {
      const { container } = render(<CSSGrid justifyItems="center">test</CSSGrid>);
      expect(container.querySelector('.ant-css-grid')).toHaveClass(
        'ant-css-grid-justify-items-center',
      );
    });

    it('support alignItems', () => {
      const { container } = render(<CSSGrid alignItems="center">test</CSSGrid>);
      expect(container.querySelector('.ant-css-grid')).toHaveClass(
        'ant-css-grid-align-items-center',
      );
    });

    it('support justifyContent', () => {
      const { container } = render(<CSSGrid justifyContent="center">test</CSSGrid>);
      expect(container.querySelector('.ant-css-grid')).toHaveClass(
        'ant-css-grid-justify-content-center',
      );
    });

    it('support alignContent', () => {
      const { container } = render(<CSSGrid alignContent="center">test</CSSGrid>);
      expect(container.querySelector('.ant-css-grid')).toHaveClass(
        'ant-css-grid-align-content-center',
      );
    });
  });

  describe('Props: templateAreas', () => {
    it('support string', () => {
      const { container } = render(
        <CSSGrid templateAreas='"header header" "sidebar main"'>test</CSSGrid>,
      );
      expect(container.querySelector('.ant-css-grid')).toHaveStyle({
        gridTemplateAreas: '"header header" "sidebar main"',
      });
    });
  });

  describe('Props: classNames and styles', () => {
    it('support classNames', () => {
      const { container } = render(<CSSGrid classNames={{ root: 'custom-class' }}>test</CSSGrid>);
      expect(container.querySelector('.ant-css-grid')).toHaveClass('custom-class');
    });

    it('support styles', () => {
      const { container } = render(
        <CSSGrid styles={{ root: { background: 'red' } }}>test</CSSGrid>,
      );
      expect(container.querySelector('.ant-css-grid')).toHaveStyle({
        background: 'red',
      });
    });

    it('user style should override styles prop', () => {
      const { container } = render(
        <CSSGrid style={{ background: 'blue' }} styles={{ root: { background: 'red' } }}>
          test
        </CSSGrid>,
      );
      expect(container.querySelector('.ant-css-grid')).toHaveStyle({
        background: 'blue',
      });
    });
  });

  describe('RTL', () => {
    it('should render RTL correctly', () => {
      const { container } = render(
        <ConfigProvider direction="rtl">
          <CSSGrid>
            <div>test</div>
          </CSSGrid>
        </ConfigProvider>,
      );
      expect(container.querySelector('.ant-css-grid')).toHaveClass('ant-css-grid-rtl');
    });
  });
});
