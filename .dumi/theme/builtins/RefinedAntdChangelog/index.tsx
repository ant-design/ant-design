import * as React from 'react';

function RefinedAntdChangelog(props) {
  console.log('RefinedAntdChangelog', props);
  return <span style={{ background: 'red' }}>1</span>;
}

function Version() {
  return <span style={{ background: 'blue' }}>2</span>;
}
function Date() {
  return <span style={{ background: 'green' }}>3</span>;
}

function Details() {
  return <span style={{ background: 'yellow' }}>4</span>;
}

export default Object.assign(RefinedAntdChangelog, {
  Version,
  Date,
  Details,
});
