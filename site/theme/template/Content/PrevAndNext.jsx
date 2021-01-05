import React from 'react';

const PrevAndNext = ({ prev, next }) => (
  <section className="prev-next-nav">
    {prev
      ? React.cloneElement(prev.props.children || prev.children[0], {
          className: 'prev-page',
        })
      : null}
    {next
      ? React.cloneElement(next.props.children || next.children[0], {
          className: 'next-page',
        })
      : null}
  </section>
);

export default PrevAndNext;
