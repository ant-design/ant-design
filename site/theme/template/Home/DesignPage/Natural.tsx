import * as React from 'react';
import Hitu, { Shape } from '@ant-design/hitu';
import InteractiveIcon from './InteractiveIcon';

const CenterLeaf = () => (
  <g transform="translate(-21, 0)">
    <path
      fill="#1AC2C4"
      d="M28.2905357,39.3895069 C19.5022967,30.5689999 19.0276854,22.2248468 26.8667019,14.3570476 L40.9119428,0.260236443 L41.1921968,3.90798505e-14 L41.4726726,0.260236443 L55.5179135,14.3570476 C63.2785398,22.1461688 62.8909795,30.4021645 54.3552327,39.1250346 L54.0940797,39.3895069 L41.1924185,52.3384615 L28.2905357,39.3895069 Z"
    />
  </g>
);
CenterLeaf.width = 40;
CenterLeaf.height = 52;

const LeftLeaf = () => (
  <g>
    <path
      transform="scale(-1 1) translate(-38 0)"
      d="M5.09459142e-12,19.103307 C5.09459142e-12,6.367769 5.67998275,9.23705556e-14 17.0399482,9.23705556e-14 L37.3937073,9.23705556e-14 L37.7846452,0.0151941192 L37.8,0.406292705 L37.8,20.7600518 C37.8,32.0064176 31.5589496,37.6858323 19.0768488,37.798296 L18.696693,37.8 L5.09459142e-12,37.8 L5.09459142e-12,19.103307 Z"
      fill="#199598"
    />
    <path
      d="M37.8,37.8 L19.103307,37.8 L18.7231512,37.7982398 C6.38129872,37.6870398 0.141036235,32.1332859 0.00236373579,21.1369781 L1.4814816e-12,20.7599955 L1.4814816e-12,0.406236487 L0.0153547541,0.0151379008 L37.8,37.8 Z"
      fill="#1AC2C4"
    />
  </g>
);
LeftLeaf.width = 38;
LeftLeaf.height = 38;

const RightLeaf = () => (
  <g>
    <path
      transform="translate(-45 -50)"
      fill="#32A7A7"
      d="M82.4631296,49.9151931 L82.8540675,49.9303872 L82.8694223,50.3214858 L82.8694223,70.6752449 C82.8694223,81.9216107 76.6283719,87.6010254 64.1462711,87.7134891 L63.7661153,87.7151931 L45.0694223,87.7151931 L45.0694223,69.0185001 C45.0694223,56.2829621 50.749405,49.9151931 62.1093705,49.9151931 L82.4631296,49.9151931 Z M76.7205394,56 L62.7205993,56 C54.9068664,56 51,60.3799469 51,69.1398408 L51,69.1398408 L51,82 L63.8601592,82 L64.121642,81.9988279 C72.707214,81.921472 77,78.0149962 77,70.2794007 L77,70.2794007 L77,56.2794606 L76.9894385,56.010451 L76.7205394,56 Z"
    />
  </g>
);
RightLeaf.width = 38;
RightLeaf.height = 38;

const shapes: Shape[] = [
  {
    type: 'shape',
    source: CenterLeaf,
    frames: [
      { frame: 0, originY: 1, x: 60, y: 62, rotate: 0 },
      { frame: 20, rotate: -7 },
      { frame: 40, rotate: 9 },
      { frame: 60, rotate: -7 },
      { frame: 80, rotate: 0 },
    ],
  },
  {
    type: 'shape',
    source: LeftLeaf,
    frames: [
      {
        frame: 0,
        originX: 1,
        originY: 1,
        x: 56,
        y: 96,
        cubic: Hitu.CUBIC_EASE_IN_OUT,
      },
      {
        frame: 20,
        rotate: 7,

        cubic: Hitu.CUBIC_EASE_IN_OUT,
      },
      {
        frame: 40,
        rotate: -5,
        cubic: Hitu.CUBIC_EASE_IN_OUT,
      },
      {
        frame: 60,
        rotate: 7,
      },
      {
        frame: 80,
        rotate: 0,
      },
    ],
  },
  {
    type: 'shape',
    source: RightLeaf,
    frames: [
      {
        frame: 0,
        originX: 0,
        originY: 1,
        x: 64,
        y: 96,
      },
      {
        frame: 20,
        rotate: -5,
        cubic: Hitu.CUBIC_EASE_IN_OUT,
      },
      {
        frame: 40,
        rotate: 7,
        cubic: Hitu.CUBIC_EASE_IN_OUT,
      },
      {
        frame: 60,
        rotate: -5,
      },
      {
        frame: 80,
        rotate: 0,
      },
    ],
  },
];

export default function Natural() {
  return <InteractiveIcon shapes={shapes} frames={80} />;
}
