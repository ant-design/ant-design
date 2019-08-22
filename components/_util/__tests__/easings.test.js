import { easeInOutCubic } from '../easings';

describe('Test easings', () => {
  it('easeInOutCubic return value', () => {
    const nums = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < 5; index++) {
      nums.push(easeInOutCubic(index, 1, 5, 4));
    }

    expect(nums).toEqual([1, 1.25, 3, 4.75, 5]);
  });
});
