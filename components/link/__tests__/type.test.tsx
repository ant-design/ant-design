import * as React from 'react';
import styled from 'styled-components';
import { contrastLinkColorStyles } from '..';

describe('Link.typescript', () => {
  it('contrastLinkColorStyles', () => {
    const wrapper = (
      <div>
        <Contrast>
          <a href="./">Contrast</a>
        </Contrast>
      </div>
    );
    expect(wrapper).toBeTruthy();
  });
});

const Contrast = styled.div`
  background: #1B4596;
  padding: 26px 16px 16px;
  a[href] {
    ${contrastLinkColorStyles()};
  }
`;
