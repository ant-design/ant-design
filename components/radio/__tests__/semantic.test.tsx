import React from 'react';

import Radio from '..';
import type { RadioProps } from '..';
import { render } from '../../../tests/utils';

describe('Radio.Semantic', () => {
  it('should merge semantic styles with context styles', () => {
    const customStyles = {
      root: { padding: '10px' },
    };
    const { container } = render(
      <Radio styles={customStyles} style={{ margin: '5px' }}>
        Test
      </Radio>,
    );

    const rootElement = container.querySelector<HTMLElement>('.ant-radio-wrapper');
    expect(rootElement).toHaveStyle({ padding: '10px', margin: '5px' });
  });

  it('should apply semantic styles to radio without label', () => {
    const customStyles = {
      root: { backgroundColor: 'rgb(0, 0, 255)' },
      icon: { backgroundColor: 'rgb(0, 128, 0)' },
    };

    const { container } = render(<Radio styles={customStyles} />);

    const rootElement = container.querySelector<HTMLElement>('.ant-radio-wrapper');
    const iconElement = container.querySelector<HTMLElement>('.ant-radio');
    const labelElement = container.querySelector<HTMLElement>('.ant-radio-label');

    expect(rootElement).toHaveStyle({ backgroundColor: customStyles.root.backgroundColor });
    expect(iconElement).toHaveStyle({ backgroundColor: customStyles.icon.backgroundColor });
    expect(labelElement).toBeNull(); // No label element should exist
  });

  it('should get correct checked prop when value matches group value', () => {
    const classNamesFn: RadioProps['classNames'] = ({ props }) => {
      return {
        root: props.checked ? 'checked-radio' : 'unchecked-radio',
      };
    };

    const { container } = render(
      <Radio.Group value="A">
        <Radio value="A" classNames={classNamesFn}>
          Radio A
        </Radio>
        <Radio value="B" classNames={classNamesFn}>
          Radio B
        </Radio>
      </Radio.Group>,
    );

    const radioElements = container.querySelectorAll<HTMLElement>('.ant-radio-wrapper');
    expect(radioElements[0]).toHaveClass('checked-radio');
    expect(radioElements[1]).toHaveClass('unchecked-radio');
  });
});
