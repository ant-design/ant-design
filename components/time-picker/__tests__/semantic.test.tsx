import React from 'react';
import dayjs from 'dayjs';

import type { TimePickerSemanticType } from '..';
import TimePicker from '..';
import { render } from '../../../tests/utils';

describe('TimePicker.Semantic', () => {
  it('should support semantic classNames and styles with useMergeSemantic', () => {
    const semanticClassNames: TimePickerSemanticType['classNames'] = {
      root: 'semantic-root',
      prefix: 'semantic-prefix',
      input: 'semantic-input',
      suffix: 'semantic-suffix',
      popup: 'semantic-popup-root',
    };

    const semanticStyles = {
      root: { backgroundColor: 'rgb(240, 240, 240)' },
      prefix: { fontSize: '16px' },
      input: { fontWeight: 'bold' },
      suffix: { opacity: 0.8 },
      popup: {
        root: { borderRadius: '8px' },
      },
    };

    const { container } = render(
      <TimePicker
        open
        classNames={semanticClassNames}
        styles={semanticStyles}
        prefix={<span>Test</span>}
        defaultValue={dayjs('12:30:45', 'HH:mm:ss')}
      />,
    );

    const rootElement = container.querySelector('.ant-picker');
    expect(rootElement).toHaveClass('semantic-root');
    expect(rootElement).toHaveStyle('background-color: rgb(240, 240, 240)');

    const prefixElement = container.querySelector('.ant-picker-prefix');
    expect(prefixElement).toHaveClass('semantic-prefix');
    expect(prefixElement).toHaveStyle('font-size: 16px');

    const inputElement = container.querySelector('.ant-picker-input input');
    expect(inputElement).toHaveClass('semantic-input');
    expect(inputElement).toHaveStyle('font-weight: bold');

    const popupRoot = container.querySelector('.ant-picker-dropdown');
    expect(popupRoot).toHaveClass('semantic-popup-root');
    expect(popupRoot).toHaveStyle('border-radius: 8px');
  });
});
