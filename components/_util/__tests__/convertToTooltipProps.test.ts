import convertToTooltipProps from '../convertToTooltipProps';

describe('convertToTooltipProps', () => {
  it('treats an array of nodes as the tooltip title', () => {
    const title = ['first', 'second'];

    expect(convertToTooltipProps(title)).toEqual({ title });
  });
});
