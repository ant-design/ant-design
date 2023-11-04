import React, { useMemo, useState } from 'react';
import { createEvent, fireEvent, render } from '@testing-library/react';
import { spyElementPrototypes } from 'rc-util/lib/test/domHook';

import { resetWarned } from '../../_util/warning';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { waitFakeTimer } from '../../../tests/utils';
import Button from '../../button';
import ConfigProvider from '../../config-provider';
import Form from '../../form';
import theme from '../../theme';
import type { Color } from '../color';
import type { ColorPickerProps } from '../ColorPicker';
import ColorPicker from '../ColorPicker';

function doMouseMove(
  container: HTMLElement,
  start: number,
  end: number,
  element = 'ant-color-picker-handler',
) {
  const mouseDown = createEvent.mouseDown(container.getElementsByClassName(element)[0], {
    pageX: start,
    pageY: start,
  });
  fireEvent(container.getElementsByClassName(element)[0], mouseDown);
  // Drag
  const mouseMove: any = new Event('mousemove');
  mouseMove.pageX = end;
  mouseMove.pageY = end;

  fireEvent(document, mouseMove);

  const mouseUp = createEvent.mouseUp(document);
  fireEvent(document, mouseUp);
}

describe('ColorPicker', () => {
  mountTest(ColorPicker);
  rtlTest(ColorPicker);
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  beforeEach(() => {
    resetWarned();
    jest.useFakeTimers();
  });

  afterEach(() => {
    errorSpy.mockReset();
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
    const App: React.FC = () => {
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

  it('Should allowClear and onClear work', async () => {
    const onClear = jest.fn();
    const { container } = render(<ColorPicker allowClear onClear={onClear} />);
    fireEvent.click(container.querySelector('.ant-color-picker-trigger')!);
    await waitFakeTimer();
    expect(container.querySelector('.ant-color-picker-clear')).toBeTruthy();
    fireEvent.click(container.querySelector('.ant-color-picker-clear')!);
    expect(onClear).toHaveBeenCalledTimes(1);

    await waitFakeTimer();
    expect(
      container.querySelector('.ant-color-picker-alpha-input input')?.getAttribute('value'),
    ).toEqual('0%');
    expect(
      container.querySelector('.ant-color-picker-trigger .ant-color-picker-clear'),
    ).toBeTruthy();

    fireEvent.change(container.querySelector('.ant-color-picker-hex-input input')!, {
      target: { value: '#273B57' },
    });
    expect(
      container.querySelector('.ant-color-picker-alpha-input input')?.getAttribute('value'),
    ).toEqual('100%');
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
    expect(container.querySelectorAll('.ant-color-picker-presets-color')[0]).toHaveClass(
      'ant-color-picker-presets-color-checked',
    );

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
    expect(container.querySelectorAll('.ant-color-picker-presets-color')[9]).toHaveClass(
      'ant-color-picker-presets-color-checked',
    );

    expect(handleColorChange).toHaveBeenCalledTimes(2);
  });

  describe('preset collapsed', () => {
    const recommendedPreset = {
      label: 'Recommended',
      colors: ['#f00', '#0f0', '#00f'],
    };

    const selector = '.ant-color-picker-presets .ant-collapse-item.ant-collapse-item-active';

    it('Should default collapsed work', async () => {
      const { container } = render(<ColorPicker open presets={[recommendedPreset]} />);

      expect(container.querySelectorAll(selector)).toHaveLength(1);
    });

    it('Should collapsed work', async () => {
      const { container } = render(
        <ColorPicker
          open
          presets={[
            recommendedPreset,
            {
              label: 'Recent',
              colors: ['#f00d', '#0f0d', '#00fd'],
              defaultOpen: false,
            },
          ]}
        />,
      );

      expect(container.querySelectorAll(selector)).toHaveLength(1);
    });
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

  it('Should not trigger onChange when click clear after clearing', async () => {
    const onChange = jest.fn();
    const { container } = render(<ColorPicker allowClear onChange={onChange} />);
    fireEvent.click(container.querySelector('.ant-color-picker-trigger')!);
    fireEvent.click(container.querySelector('.ant-color-picker-clear')!);
    expect(onChange).toHaveBeenCalledTimes(1);
    fireEvent.click(container.querySelector('.ant-popover .ant-color-picker-clear')!);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('Should fix hover boundary issues', async () => {
    spyElementPrototypes(HTMLElement, {
      getBoundingClientRect: () => ({
        x: 0,
        y: 100,
        width: 100,
        height: 100,
      }),
    });
    const { container } = render(<ColorPicker trigger="hover" />);
    fireEvent.mouseEnter(container.querySelector('.ant-color-picker-trigger')!);
    await waitFakeTimer();
    doMouseMove(container, 0, 999);
    expect(container.querySelector('.ant-popover-hidden')).toBeFalsy();
    fireEvent.mouseLeave(container.querySelector('.ant-color-picker-trigger')!);
    await waitFakeTimer();
    expect(container.querySelector('.ant-popover-hidden')).toBeTruthy();
  });

  it('Should work at dark mode', async () => {
    const { container } = render(
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <ColorPicker
          open
          presets={[
            {
              label: 'test',
              colors: ['#0000001A'],
            },
          ]}
        />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-color-picker-presets-color-bright')).toBeFalsy();
  });

  it('Should showText as render function work', async () => {
    const { container } = render(<ColorPicker showText={(color) => color.toHexString()} />);
    const targetEle = container.querySelector('.ant-color-picker-trigger-text');
    expect(targetEle).toBeTruthy();
    expect(targetEle?.innerHTML).toBe('#1677ff');
  });

  it('Should showText work', async () => {
    const { container } = render(<ColorPicker open showText />);
    const targetEle = container.querySelector('.ant-color-picker-trigger-text');
    expect(targetEle).toBeTruthy();

    fireEvent.mouseDown(
      container.querySelector('.ant-color-picker-format-select .ant-select-selector')!,
    );
    await waitFakeTimer();
    fireEvent.click(container.querySelector('.ant-select-item[title="HSB"]')!);
    await waitFakeTimer();
    expect(targetEle?.innerHTML).toEqual('hsb(215, 91%, 100%)');

    fireEvent.mouseDown(
      container.querySelector('.ant-color-picker-format-select .ant-select-selector')!,
    );
    await waitFakeTimer();
    fireEvent.click(container.querySelector('.ant-select-item[title="RGB"]')!);
    await waitFakeTimer();
    expect(targetEle?.innerHTML).toEqual('rgb(22, 119, 255)');

    fireEvent.mouseDown(
      container.querySelector('.ant-color-picker-format-select .ant-select-selector')!,
    );
    await waitFakeTimer();
    fireEvent.click(container.querySelector('.ant-select-item[title="HEX"]')!);
    await waitFakeTimer();
    expect(targetEle?.innerHTML).toEqual('#1677FF');
  });

  it('Should size work', async () => {
    const { container: lg } = render(<ColorPicker size="large" />);
    expect(lg.querySelector('.ant-color-picker-lg')).toBeTruthy();
    const { container: sm } = render(<ColorPicker size="small" />);
    expect(sm.querySelector('.ant-color-picker-sm')).toBeTruthy();
  });

  it('Should panelRender work', async () => {
    const { container: panelContainer } = render(
      <ColorPicker open panelRender={(panel) => <div className="custom-panel">{panel}</div>} />,
    );
    expect(panelContainer.querySelector('.custom-panel')).toBeTruthy();
    expect(panelContainer.querySelector('.ant-color-picker-inner-content')).toBeTruthy();
    expect(panelContainer).toMatchSnapshot();

    const { container: componentContainer } = render(
      <ColorPicker
        open
        panelRender={(_, { components: { Picker, Presets } }) => (
          <div className="custom-panel">
            <Picker />
            <Presets />
          </div>
        )}
      />,
    );
    expect(componentContainer.querySelector('.custom-panel')).toBeTruthy();
    expect(componentContainer.querySelector('.ant-color-picker-inner-content')).toBeTruthy();
    expect(componentContainer).toMatchSnapshot();
  });

  it('Should null work as expect', async () => {
    spyElementPrototypes(HTMLElement, {
      getBoundingClientRect: () => ({
        x: 0,
        y: 100,
        width: 100,
        height: 100,
      }),
    });
    const { container } = render(<ColorPicker value={null} open />);
    expect(
      container.querySelector('.ant-color-picker-alpha-input input')?.getAttribute('value'),
    ).toEqual('0%');
    expect(
      container.querySelector('.ant-color-picker-hex-input input')?.getAttribute('value'),
    ).toEqual('000000');
    doMouseMove(container, 0, 999);
    expect(
      container.querySelector('.ant-color-picker-alpha-input input')?.getAttribute('value'),
    ).toEqual('100%');
  });

  it('should support valid in form', async () => {
    const Demo = () => {
      const [form] = Form.useForm();
      const submit = () => {
        form.validateFields();
      };
      return (
        <Form form={form} initialValues={{ 'color-picker': null }}>
          <Form.Item
            name="color-picker"
            label="ColorPicker"
            rules={[{ required: true, message: 'color is required!' }]}
          >
            <ColorPicker />
          </Form.Item>
          <button type="button" onClick={submit}>
            submit
          </button>
        </Form>
      );
    };
    const { container } = render(<Demo />);
    expect(container.querySelector('.ant-color-picker-status-error')).toBeFalsy();
    fireEvent.click(container.querySelector('button')!);
    await waitFakeTimer();
    expect(container.querySelector('.ant-color-picker-status-error')).toBeTruthy();
    expect(container.querySelector('.ant-form-item-explain-error')?.innerHTML).toEqual(
      'color is required!',
    );
  });

  it('Should onChangeComplete work', async () => {
    const handleChangeComplete = jest.fn();
    const { container } = render(
      <ColorPicker open onChangeComplete={handleChangeComplete} allowClear />,
    );

    doMouseMove(container, 0, 999);
    fireEvent.click(container.querySelector('.ant-color-picker-clear')!);
    fireEvent.change(container.querySelector('.ant-color-picker-hex-input input')!, {
      target: { value: '#273B57' },
    });
    expect(handleChangeComplete).toHaveBeenCalledTimes(3);
  });

  it('Should disabledAlpha work', async () => {
    const { container } = render(<ColorPicker open disabledAlpha />);
    expect(container.querySelector('.ant-color-picker-slider-group-disabled-alpha')).toBeTruthy();
    expect(container.querySelector('.ant-color-picker-slider-alpha')).toBeFalsy();
    expect(container.querySelector('.ant-color-picker-alpha-input')).toBeFalsy();
  });

  it('Should disabledAlpha work with value', async () => {
    spyElementPrototypes(HTMLElement, {
      getBoundingClientRect: () => ({
        x: 0,
        y: 100,
        width: 100,
        height: 100,
      }),
    });
    const Demo = () => {
      const [value, setValue] = useState<ColorPickerProps['value']>('#1677ff86');
      const [changedValue, setChangedValue] = useState<ColorPickerProps['value']>('#1677ff86');
      return (
        <ColorPicker
          open
          disabledAlpha
          value={value}
          onChange={setValue}
          onChangeComplete={setChangedValue}
        >
          <div className="color-value">
            {typeof value === 'string' ? value : value?.toHexString()}
          </div>
          <div className="color-value-changed">
            {typeof changedValue === 'string' ? changedValue : changedValue?.toHexString()}
          </div>
        </ColorPicker>
      );
    };
    const { container } = render(<Demo />);
    expect(container.querySelector('.color-value')?.innerHTML).toEqual('#1677ff86');
    doMouseMove(container, 0, 999);
    expect(container.querySelector('.color-value')?.innerHTML).toEqual('#000000');
    expect(container.querySelector('.color-value-changed')?.innerHTML).toEqual('#000000');
  });

  it('Should warning work when set disabledAlpha true and color is alpha color', () => {
    render(<ColorPicker disabledAlpha value="#1677ff" />);
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('Should not show popup when disabled', async () => {
    const Demo = () => {
      const [disabled, setDisabled] = useState(false);
      return (
        <div className="App">
          <ColorPicker disabled={disabled} />
          <div className="buttons">
            <Button
              className="disabled-btn"
              disabled={disabled}
              onClick={() => {
                setDisabled(true);
              }}
            >
              禁用
            </Button>
            <Button
              className="active-btn"
              disabled={!disabled}
              onClick={() => {
                setDisabled(false);
              }}
            >
              启用
            </Button>
          </div>
        </div>
      );
    };
    const { container } = render(<Demo />);
    fireEvent.click(container.querySelector('.disabled-btn')!);
    fireEvent.click(container.querySelector('.ant-color-picker-trigger')!);
    await waitFakeTimer();
    fireEvent.click(container.querySelector('.active-btn')!);
    expect(document.body.querySelector('.ant-popover')).toBeFalsy();
  });

  it('Should defaultFormat work', () => {
    const { container } = render(<ColorPicker open defaultFormat="hsb" />);
    expect(container.querySelector('.ant-color-picker-hsb-input')).toBeTruthy();
  });
});
