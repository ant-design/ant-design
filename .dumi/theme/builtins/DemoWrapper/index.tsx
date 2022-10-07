import React from 'react';
import { DumiDemoGrid } from 'dumi';

const DemoWrapper: typeof DumiDemoGrid = ({ items }) => {
  // TODO: implement demo toolbar
  // from: https://github.com/ant-design/ant-design/blob/86891775dd6deb4e154b885718a370d31bc78288/site/theme/template/Content/ComponentDoc.jsx#L187-L214
  //  1. Expand source code for all previewer
  //  2. Display debug demo
  console.log('grid demos', items);

  return <DumiDemoGrid items={items} />;
};

export default DemoWrapper;
