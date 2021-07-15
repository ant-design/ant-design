import * as React from 'react';
import { ConfigContext } from '../config-provider';

const Simple = () => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('empty-img-simple');
  return (
    <svg
      className={prefixCls}
      data-name="3"
      xmlns="http://www.w3.org/2000/svg"
      width="192"
      height="192"
      viewBox="0 0 192 192"
    >
      <defs>
        <radialGradient id="radial-gradient" cx="96" cy="96" r="96" gradientUnits="userSpaceOnUse">
          <stop offset="0" />
          <stop offset="1" stopColor="#fff" />
        </radialGradient>
        <filter id="filter" x="24" y="30" width="144" height="132" filterUnits="userSpaceOnUse">
          <feGaussianBlur result="blur" stdDeviation="3.464" in="SourceAlpha" />
          <feFlood result="flood" floodColor="#515c68" floodOpacity="0.2" />
          <feComposite result="composite" operator="out" in2="blur" />
          <feOffset result="offset" />
          <feComposite result="composite-2" operator="in" in2="SourceAlpha" />
          <feBlend result="blend" in2="SourceGraphic" />
        </filter>
        <filter id="filter-2" x="39" y="62" width="119" height="47" filterUnits="userSpaceOnUse">
          <feOffset result="offset" dx="2.121" dy="2.121" in="SourceAlpha" />
          <feGaussianBlur result="blur" stdDeviation="3.464" />
          <feFlood result="flood" floodOpacity="0.1" />
          <feComposite result="composite" operator="in" in2="blur" />
          <feBlend result="blend" in="SourceGraphic" />
          <feImage
            preserveAspectRatio="none"
            x="48"
            y="71"
            width="96"
            height="24"
            result="image"
            xlinkHref="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iOTYiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA5NiAyNCI+CiAgPGRlZnM+CiAgICA8c3R5bGU+CiAgICAgIC5jbHMtMSB7CiAgICAgICAgb3BhY2l0eTogMC4zOwogICAgICAgIGZpbGw6IHVybCgjbGluZWFyLWdyYWRpZW50KTsKICAgICAgfQogICAgPC9zdHlsZT4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ibGluZWFyLWdyYWRpZW50IiB4MT0iMzYiIHgyPSI2MCIgeTI9IjI0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIG9mZnNldD0iLTAuMjUiIHN0b3AtY29sb3I9IiNmZmYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxLjI1IiBzdG9wLWNvbG9yPSIjZmZmIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCBjbGFzcz0iY2xzLTEiIHdpZHRoPSI5NiIgaGVpZ2h0PSIyNCIvPgo8L3N2Zz4K"
          />
          <feComposite result="composite-2" operator="in" in2="SourceGraphic" />
          <feBlend result="blend-2" in2="blend" />
          <feGaussianBlur result="blur-2" stdDeviation="1" in="SourceAlpha" />
          <feFlood result="flood-2" floodColor="#fff" />
          <feComposite result="composite-3" operator="out" in2="blur-2" />
          <feOffset result="offset-2" dx="0.707" dy="0.707" />
          <feComposite result="composite-4" operator="in" in2="SourceAlpha" />
          <feBlend result="blend-3" in2="blend-2" />
        </filter>
      </defs>
      <rect id="bg" className="cls-1" width="192" height="192" />
      <path
        id="bg-2"
        data-name="bg"
        className="cls-2"
        d="M150,138H66L42,162V138a18,18,0,0,1-18-18V48A18,18,0,0,1,42,30H150a18,18,0,0,1,18,18v72A18,18,0,0,1,150,138Z"
      />
      <path
        id="nodata"
        className="cls-3"
        d="M132,95H96a12,12,0,0,1,0-24l0.041,0h35.918L132,71A12,12,0,0,1,132,95ZM60,95A12,12,0,1,1,72,83,12,12,0,0,1,60,95Z"
      />
    </svg>
  );
};

export default Simple;
