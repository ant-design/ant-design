import React from 'react';

export function toArrayChildren(children) {
  const ret = [];
  React.Children.forEach(children, (c) => {
    ret.push(c);
  });
  return ret;
}

export function getPartNumber(num) {
  if (!num) {
    return null;
  }
  const countStr = num.toString();
  const obj = {};
  for (let i = 0; i < countStr.length; i++) {
    obj[countStr.length - 1 - i] = Number(countStr[i]);
  }
  return obj;
}

export function getTranslateY(differ, data, _data, height, i) {
  let translateY = 0;
  if (!differ) {
    //不想插入40个，改变要滚到的距离；
    if (_data[i + '_add']) {
      return -(data[i] + 20) * height;
    }
    if (_data[i + '_rem']) {
      return -data[i] * height;
    }
    return false;
  }
  //判断相差的位数来驱动数字；差个位滚动一格，差10的部分及以上个位滚动一周；
  const countToString = Math.abs(differ).toString();
  const countLength = countToString.length;
  const on = _data[i];
  const to = data[i];
  if (differ > 0) {
    if (countLength - 1 > i) {
      translateY = -(to - (to - on)) * height;
      //on大于to且differ大于10，如9->0,需要设计滚动到的位置＋10;
      if (on > to) {
        data[i + '_add'] = true;
      }
    } else if (countLength - 1 < i && to === on) {
      //参数不变动；
      translateY = null;
    } else if (typeof on === 'undefined') {
      //新增加入时设为0；
      translateY = -10 * height;
    } else {
      //如果开始大于到达，到达（to）加10；
      const _to = on > to ? to + 10 : to;
      translateY = -(to - (_to - on) + 10) * height;
    }
  } else {
    if (countLength - 1 > i) {
      translateY = -(to + (on - to) + 20) * height;
      //同上，differ大于10时，且to在于on
      if (to > on) {
        data[i + '_rem'] = true;
      }
    } else if (countLength - 1 < i && to === on) {
      translateY = null;
    } else {
      const _on = on < to ? on + 10 : on;
      translateY = -(to + (_on - to) + 10) * height;
    }
  }
  return translateY;
}
