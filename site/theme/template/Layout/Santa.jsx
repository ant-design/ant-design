import React from 'react';
import { Tooltip } from 'antd';

export default () => {
  const now = new Date();
  const isChristmas = now.getMonth() === 11 && now.getDate() === 25;
  return (
    isChristmas && (
      <Tooltip title="🎅🏻 Merry Christmas!">
        <div className="santa">
          <div className="santa-body">
            <div className="santa-head">
              <div className="santa-ear" />
              <div className="santa-ear" />
              <div className="santa-hat" />
              <div className="santa-eye" />
              <div className="santa-eye" />
              <div className="santa-nose" />
              <div className="santa-mouth" />
            </div>
          </div>
        </div>
      </Tooltip>
    )
  );
};
