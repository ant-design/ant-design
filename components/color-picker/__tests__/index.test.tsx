import { fireEvent, render } from '@testing-library/react';
import React, { useMemo, useState } from 'react';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { waitFakeTimer } from '../../../tests/utils';
import ColorPicker from '../ColorPicker';
import type { Color } from '../color';

describe('ColorPicker', () => {
  mountTest(ColorPicker);
  rtlTest(ColorPicker);
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('Should component render correct', () => {
    const { container } = render(<ColorPicker />);
    expect(container.querySelector('.ant-color-picker-trigger')).toBeTruthy();
  });

  it('Should component defaultValue work', () => {
    const { container } = render(<ColorPicker defaultValue="#000000" />);
    expect(
      container.querySelector('.ant-color-picker-color-block-inner')?.getAttribute('style'),
    ).toEqual('background: rgb(0, 0, 0);');
  });

  it('Should component custom trigger work', async () => {
    const App = () => {
      const [color, setColor] = useState<Color | string>('hsb(215, 91%, 100%)');
      const colorString = useMemo(
        () => (typeof color === 'string' ? color : color.toHsbString()),
        [color],
      );
      return (
        <ColorPicker value={color} onChange={setColor} format="hsb">
          <span className="custom-trigger">{colorString}</span>
        </ColorPicker>
      );
    };
    const { container } = render(<App />);
    expect(container.querySelector('.custom-trigger')).toBeTruthy();
    fireEvent.click(container.querySelector('.custom-trigger')!);
    await waitFakeTimer();
    expect(container.querySelector('.ant-color-picker')).toBeTruthy();
    const hsbInputEls = container.querySelectorAll('.ant-color-picker-hsb-input input');
    fireEvent.change(hsbInputEls[0], {
      target: { value: 0 },
    });
    fireEvent.change(hsbInputEls[1], {
      target: { value: 78 },
    });
    fireEvent.change(hsbInputEls[2], {
      target: { value: 39 },
    });
    expect(container.querySelector('.custom-trigger')?.innerHTML).toEqual('hsb(0, 78%, 39%)');
  });

  it('Should popup open work', async () => {
    const { container } = render(<ColorPicker />);
    fireEvent.click(container.querySelector('.ant-color-picker-trigger')!);
    await waitFakeTimer();
    expect(container.querySelector('.ant-color-picker')).toBeTruthy();
    fireEvent.click(container.querySelector('.ant-color-picker-trigger')!);
    await waitFakeTimer();
    expect(container.querySelector('.ant-popover-hidden')).toBeTruthy();
  });

  it('Should disabled work', async () => {
    const { container } = render(<ColorPicker disabled />);
    expect(container.querySelector('.ant-color-picker-trigger-disabled')).toBeTruthy();
    expect(container).toMatchSnapshot();
    fireEvent.click(container.querySelector('.ant-color-picker-trigger')!);
    await waitFakeTimer();
    expect(container.querySelector('.ant-color-picker')).toBeFalsy();
  });

  it('Should allowClear work', async () => {
    const { container } = render(<ColorPicker allowClear />);
    fireEvent.click(container.querySelector('.ant-color-picker-trigger')!);
    await waitFakeTimer();
    expect(container.querySelector('.ant-color-picker-clear')).toBeTruthy();
    fireEvent.click(container.querySelector('.ant-color-picker-clear')!);
    expect(
      container.querySelector('.ant-color-picker-alpha-input input')?.getAttribute('value'),
    ).toEqual('0%');
    expect(
      container.querySelector('.ant-color-picker-trigger .ant-color-picker-clear'),
    ).toBeTruthy();
    fireEvent.change(container.querySelector('.ant-color-picker-alpha-input input')!, {
      target: { value: 1 },
    });
    expect(
      container.querySelector('.ant-color-picker-trigger .ant-color-picker-clear'),
    ).toBeFalsy();
  });

  it('Should render trigger work', async () => {
    const { container } = render(
      <ColorPicker>
        <div className="trigger" />
      </ColorPicker>,
    );
    expect(container.querySelector('.trigger')).toBeTruthy();
    expect(container).toMatchSnapshot();
    fireEvent.click(container.querySelector('.trigger')!);
    await waitFakeTimer();
    expect(container.querySelector('.ant-color-picker')).toBeTruthy();
    fireEvent.click(container.querySelector('.trigger')!);
    await waitFakeTimer();
    expect(container.querySelector('.ant-popover-hidden')).toBeTruthy();
  });

  it('Should preset color work', async () => {
    const handleColorChange = jest.fn();

    const { container } = render(
      <ColorPicker
        onChange={handleColorChange}
        presets={[
          {
            label: 'Recommended',
            colors: [
              '#000000',
              '#000000E0',
              '#000000A6',
              '#00000073',
              '#00000040',
              '#00000026',
              '#0000001A',
              '#00000012',
              '#0000000A',
              '#00000005',
            ],
          },
          {
            label: 'Recent',
            colors: [],
          },
        ]}
      />,
    );

    fireEvent.click(container.querySelector('.ant-color-picker-trigger')!);
    await waitFakeTimer();
    const presetsColors = container
      .querySelector('.ant-collapse-content')
      ?.querySelectorAll('.ant-color-picker-presets-color')!;

    expect(container.querySelector('.ant-color-picker-presets')).toBeTruthy();
    expect(presetsColors.length).toBe(10);
    expect(
      container
        .querySelectorAll('.ant-collapse-content')[1]
        .querySelector('.ant-color-picker-presets-empty'),
    ).toBeTruthy();

    fireEvent.click(presetsColors[0]);
    expect(
      presetsColors[0].classList.contains('ant-color-picker-presets-color-bright'),
    ).toBeFalsy();
    expect(
      container.querySelector('.ant-color-picker-hex-input input')?.getAttribute('value'),
    ).toEqual('000000');

    fireEvent.click(presetsColors[9]);
    expect(
      presetsColors[9].classList.contains('ant-color-picker-presets-color-bright'),
    ).toBeTruthy();
    expect(
      container.querySelector('.ant-color-picker-hex-input input')?.getAttribute('value'),
    ).toEqual('000000');
    expect(
      container.querySelector('.ant-color-picker-alpha-input input')?.getAttribute('value'),
    ).toEqual('2%');

    expect(handleColorChange).toHaveBeenCalledTimes(2);
  });

  it('Should format change work', async () => {
    const { container } = render(<ColorPicker />);
    fireEvent.click(container.querySelector('.ant-color-picker-trigger')!);
    await waitFakeTimer();
    expect(container.querySelector('.ant-color-picker-hex-input')).toBeTruthy();
    fireEvent.mouseDown(
      container.querySelector('.ant-color-picker-format-select .ant-select-selector')!,
    );
    await waitFakeTimer();
    fireEvent.click(container.querySelector('.ant-select-item[title="HSB"]')!);
    await waitFakeTimer();
    expect(container.querySelector('.ant-color-picker-hsb-input')).toBeTruthy();

    fireEvent.mouseDown(
      container.querySelector('.ant-color-picker-format-select .ant-select-selector')!,
    );
    await waitFakeTimer();
    fireEvent.click(container.querySelector('.ant-select-item[title="RGB"]')!);
    await waitFakeTimer();
    expect(container.querySelector('.ant-color-picker-rgb-input')).toBeTruthy();
  });

  it('Should hex input work', async () => {
    const { container } = render(<ColorPicker open format="hex" />);
    fireEvent.change(container.querySelector('.ant-color-picker-hex-input input')!, {
      target: { value: 631515 },
    });
    expect(
      container.querySelector('.ant-color-picker-color-block-inner')?.getAttribute('style'),
    ).toEqual('background: rgb(99, 21, 21);');
  });

  it('Should rgb input work', async () => {
    const { container } = render(<ColorPicker open format="rgb" />);
    const rgbInputEls = container.querySelectorAll('.ant-color-picker-rgb-input input');
    fireEvent.change(rgbInputEls[0], {
      target: { value: 99 },
    });
    fireEvent.change(rgbInputEls[1], {
      target: { value: 21 },
    });
    fireEvent.change(rgbInputEls[2], {
      target: { value: 21 },
    });
    expect(
      container.querySelector('.ant-color-picker-color-block-inner')?.getAttribute('style'),
    ).toEqual('background: rgb(99, 21, 21);');
  });

  it('Should hsb input work', async () => {
    const { container } = render(<ColorPicker open format="hsb" />);
    const hsbInputEls = container.querySelectorAll('.ant-color-picker-hsb-input input');
    fireEvent.change(hsbInputEls[0], {
      target: { value: 0 },
    });
    fireEvent.change(hsbInputEls[1], {
      target: { value: 78 },
    });
    fireEvent.change(hsbInputEls[2], {
      target: { value: 39 },
    });
    expect(
      container.querySelector('.ant-color-picker-color-block-inner')?.getAttribute('style'),
    ).toEqual('background: rgb(99, 22, 22);');
  });
});
