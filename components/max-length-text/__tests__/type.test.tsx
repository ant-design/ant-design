import * as React from 'react';
import MaxLengthText from '..';

describe('MaxLengthText.typescript', () => {
  it('Max Length Text Basic', () => {
    const wrapper = (
      <MaxLengthText maxLength={150}>
        Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike
        colors. Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers
        to go on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot
        yardarm spyglass sheet transom heave to.
      </MaxLengthText>
    );

    expect(wrapper).toBeTruthy();
  });
});
