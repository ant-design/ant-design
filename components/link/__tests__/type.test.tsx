import * as React from 'react';
import styled from 'styled-components';
import Link from '..';

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
  background: #1b4596;
  padding: 26px 16px 16px;
  a[href] {
    ${Link.contrastLinkColorStyles()};
  }
`;
