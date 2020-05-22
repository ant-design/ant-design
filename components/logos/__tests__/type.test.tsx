import * as React from 'react';
import Logos from '..';

const { AI2Logo, AllenNLP, Aristo, Mosaic, Prior, SemanticScholar, Fairness, Incubator } = Logos;

describe('Logos.typescript', () => {
  it('AI2Logo', () => {
    const wrapper = <AI2Logo />;
    expect(wrapper).toBeTruthy();
  });

  it('AllenNLP', () => {
    const wrapper = <AllenNLP />;
    expect(wrapper).toBeTruthy();
  });

  it('Aristo', () => {
    const wrapper = <Aristo />;
    expect(wrapper).toBeTruthy();
  });

  it('Mosaic', () => {
    const wrapper = <Mosaic />;
    expect(wrapper).toBeTruthy();
  });

  it('Prior', () => {
    const wrapper = <Prior />;
    expect(wrapper).toBeTruthy();
  });

  it('SemanticScholar', () => {
    const wrapper = <SemanticScholar />;
    expect(wrapper).toBeTruthy();
  });

  it('Fairness', () => {
    const wrapper = <Fairness />;
    expect(wrapper).toBeTruthy();
  });

  it('Incubator', () => {
    const wrapper = <Incubator />;
    expect(wrapper).toBeTruthy();
  });
});
