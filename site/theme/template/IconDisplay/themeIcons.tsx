import * as React from 'react';
import { CustomIconComponentProps } from 'antd/lib/icon';

export const FilledIcon: React.SFC<CustomIconComponentProps> = props => {
  const path =
    'M864 64H160C107 64 64 107 64 160v' +
    '704c0 53 43 96 96 96h704c53 0 96-43 96-96V16' +
    '0c0-53-43-96-96-96z';
  return (
    <svg {...(props as any)} viewBox="0 0 1024 1024">
      <path d={path} />
    </svg>
  );
};

export const OutlinedIcon: React.SFC<CustomIconComponentProps> = props => {
  const path =
    'M864 64H160C107 64 64 107 64 160v7' +
    '04c0 53 43 96 96 96h704c53 0 96-43 96-96V160c' +
    '0-53-43-96-96-96z m-12 800H172c-6.6 0-12-5.4-' +
    '12-12V172c0-6.6 5.4-12 12-12h680c6.6 0 12 5.4' +
    ' 12 12v680c0 6.6-5.4 12-12 12z';
  return (
    <svg {...(props as any)} viewBox="0 0 1024 1024">
      <path d={path} />
    </svg>
  );
};

export const TwoToneIcon: React.SFC<CustomIconComponentProps> = props => {
  const path =
    'M16 512c0 273.932 222.066 496 496 49' +
    '6s496-222.068 496-496S785.932 16 512 16 16 238.' +
    '066 16 512z m496 368V144c203.41 0 368 164.622 3' +
    '68 368 0 203.41-164.622 368-368 368z';
  return (
    <svg {...(props as any)} viewBox="0 0 1024 1024">
      <path d={path} />
    </svg>
  );
};
