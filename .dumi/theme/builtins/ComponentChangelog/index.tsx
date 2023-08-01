import { useRouteData } from 'dumi';
import React from 'react';

export default function ComponentChangelog() {
  const data = useRouteData();
  console.log('>>>>>', data);
  return 233345;
}
