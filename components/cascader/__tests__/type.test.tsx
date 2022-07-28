import * as React from 'react';
import type { BaseOptionType } from '..';
import Cascader from '..';
import { render } from '../../../tests/utils';

describe('Cascader.typescript', () => {
  it('options value', () => {
    const options = [
      {
        value: 1,
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
              {
                value: 'xihu',
                label: 'West Lake',
              },
            ],
          },
        ],
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
          {
            value: 'nanjing',
            label: 'Nanjing',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              },
            ],
          },
        ],
      },
    ];

    const result = <Cascader options={options} defaultValue={[1, 'hangzhou']} />;

    expect(result).toBeTruthy();
  });

  it('suffixIcon', () => {
    const { container } = render(<Cascader suffixIcon={<span />} />);
    expect(
      container.querySelector('.ant-select-arrow')?.querySelector('span')?.className,
    ).toBeFalsy();
  });

  it('Generic', () => {
    interface MyOptionData extends BaseOptionType {
      customizeLabel: string;
      customizeValue: string;
      customizeChildren?: MyOptionData[];
    }

    const { container } = render(
      <Cascader<MyOptionData>
        options={[
          {
            customizeLabel: 'Bamboo',
            customizeValue: 'bamboo',
            customizeChildren: [
              {
                customizeLabel: 'Little',
                customizeValue: 'little',
              },
            ],
          },
        ]}
      />,
    );
    expect(container).toBeTruthy();
  });

  it('single onChange', () => {
    const { container } = render(
      <Cascader multiple={false} onChange={(values: (string | number)[]) => values} />,
    );
    expect(container).toBeTruthy();
  });

  it('multiple onChange', () => {
    const { container } = render(
      <Cascader multiple onChange={(values: (string | number)[][]) => values} />,
    );
    expect(container).toBeTruthy();
  });
});
