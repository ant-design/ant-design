import React from 'react';

export function toArrayChildren(children) {
  const ret = [];
  React.Children.forEach(children, (c) => {
    ret.push(c);
  });
  return ret;
}

export function getPartNumber(num) {
  const countStr = num.toString();
  const obj = {};
  for (let i = 0; i < countStr.length; i++) {
    obj[countStr.length - 1 - i] = Number(countStr[i]);
  }
  return obj;
}

export function getTranslateY(count, preCount, data, preData, j, height, _length) {
  let translateY = 0;
  const oneData = Number(count.toString()[j]);
  const on = preData[_length - j];
  const to = data[_length - j];
  const preOn = preData[_length - j + 1];
  const preTo = data[_length - j + 1];
  if (count === preCount) {
    const add = preData[(_length - j) + '_add'];
    const rem = preData[(_length - j) + '_rem'];
    if (add) {
      translateY = -(oneData + 20) * height;
    }
    if (rem) {
      translateY = -oneData * height;
    }
  }
  if (count > preCount) {
    if (on > to) {
      translateY = -(oneData - (to - on)) * height;
      if (typeof preOn === 'number' && preTo - preOn > 1) {
        data[(_length - j) + '_add'] = true;
      }
    } else if (on < to) {
      translateY = -(oneData + 10 - (to - on)) * height;
      if (preTo - preOn) {
        //translateY = -(oneData + 20 - (to - on)) * height;
        data[(_length - j) + '_add'] = true;
      }
    } else {
      if (typeof preOn === 'number' && typeof preTo === 'number') {
        translateY = -oneData * height;
      }
    }
  } else if (count < preCount) {
    if (on < to) {
      translateY = -(oneData + 20 - ( to - on)) * height;
      if (typeof preTo === 'number' && preOn - preTo > 1) {
        data[(_length - j) + '_rem'] = true;
      }
    } else if (on > to) {
      translateY = -(oneData + 10 - (to - on)) * height;
      if (preOn - preTo) {
        translateY = -(oneData + 20 - (to - on)) * height;
      }
    } else {
      if (typeof preOn === 'number' && typeof preTo === 'number') {
        translateY = -(oneData + 20) * height;
      }
    }
  }
  if (on !== 0 && !on) {
    translateY = -10 * height;
  }
  return translateY;
}
