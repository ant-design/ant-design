import React, { cloneElement } from 'react';

interface Props {
  prev: any;
  next: any;
}

const PrevAndNext: React.FC<Props> = ({ prev, next }) => (
  <section className="prev-next-nav">
    {prev && cloneElement(prev.props.children || prev.children[0], { className: 'prev-page' })}
    {next && cloneElement(next.props.children || next.children[0], { className: 'next-page' })}
  </section>
);

export default PrevAndNext;
