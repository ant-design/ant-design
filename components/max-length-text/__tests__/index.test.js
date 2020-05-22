import React from 'react';
import { render } from 'enzyme';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

import MaxLengthText from '..';

describe('MaxLengthText', () => {
  mountTest(MaxLengthText);
  rtlTest(MaxLengthText);

  describe('variants', () => {
    it('default', () => {
      const wrapper = render(
        <MaxLengthText maxLength={150}>
          Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable
          strike colors. Bring a spring upon her cable holystone blow the man down spanker Shiver me
          timbers to go on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy
          black spot yardarm spyglass sheet transom heave to.
        </MaxLengthText>,
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
