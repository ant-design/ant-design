import React from 'react';

import DatePicker from '..';
import { fireEvent, render } from '../../../tests/utils';
import TimePicker from '../../time-picker';

const pickers = [
  ['DatePicker', <DatePicker key="date" showTime open />],
  ['RangePicker', <DatePicker.RangePicker key="date-range" showTime showNow open />],
  ['TimePicker', <TimePicker key="time" open />],
  ['TimeRangePicker', <TimePicker.RangePicker key="time-range" showNow open />],
] as const;

describe('Picker footer', () => {
  it.each(pickers)('%s uses accessible footer buttons without submitting a form', (_, picker) => {
    const onSubmit = jest.fn((event: React.FormEvent) => event.preventDefault());
    const { getByRole } = render(<form onSubmit={onSubmit}>{picker}</form>);
    const now = getByRole('button', { name: 'Now' });
    const ok = getByRole('button', { name: 'OK' });

    expect(now).toHaveAttribute('type', 'button');
    expect(ok).toHaveAttribute('type', 'button');
    expect(ok).toHaveClass('ant-btn-primary');
    now.focus();
    expect(now).toHaveFocus();
    fireEvent.click(now);
    fireEvent.click(ok);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('disables Today when the current date is unavailable', () => {
    const onChange = jest.fn();
    const { getByRole } = render(<DatePicker open disabledDate={() => true} onChange={onChange} />);
    const today = getByRole('button', { name: 'Today' });

    expect(today).toBeDisabled();
    fireEvent.click(today);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('supports separate custom Now and OK buttons', () => {
    const NowButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button {...props} type="button" data-testid="custom-now" />
    );
    const OkButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button {...props} type="button" data-testid="custom-ok" />
    );
    const { getByTestId } = render(
      <DatePicker open showTime components={{ nowButton: NowButton, okButton: OkButton }} />,
    );

    expect(getByTestId('custom-now')).toHaveTextContent('Now');
    expect(getByTestId('custom-ok')).toHaveTextContent('OK');
  });

  it('keeps custom legacy confirmation buttons', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const LegacyButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button {...props} type="button" data-testid="legacy-ok" />
    );
    const { getByTestId, getByRole } = render(
      <DatePicker open showTime components={{ button: LegacyButton }} />,
    );

    expect(getByTestId('legacy-ok')).toHaveTextContent('OK');
    expect(getByRole('button', { name: 'Now' })).not.toHaveAttribute('data-testid');
    errorSpy.mockRestore();
  });
});
