import React from 'react';

import Slider from '..';
import { render } from '../../../tests/utils';

describe('Slider.Semantic', () => {
  it('should support classNames and styles as functions', () => {
    const classNamesFn = (info: { props: any }) => {
      if (info.props.disabled) {
        return { root: 'disabled-slider' };
      }
      return { root: 'enabled-slider' };
    };

    const stylesFn = (info: { props: any }) => {
      if (info.props.vertical) {
        return { root: { padding: '10px' } };
      }
      return { root: { margin: '10px' } };
    };

    const { container, rerender } = render(
      <Slider disabled defaultValue={30} classNames={classNamesFn} styles={stylesFn} />,
    );

    const rootElement1 = container.querySelector('.ant-slider') as HTMLElement;
    expect(rootElement1).toHaveClass('disabled-slider');
    expect(rootElement1).toHaveStyle({ margin: '10px' });

    rerender(<Slider vertical defaultValue={30} classNames={classNamesFn} styles={stylesFn} />);

    const rootElement2 = container.querySelector('.ant-slider') as HTMLElement;
    expect(rootElement2).toHaveClass('enabled-slider');
    expect(rootElement2).toHaveStyle({ padding: '10px' });
  });
});
