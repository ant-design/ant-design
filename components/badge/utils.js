export function getPartNumber(num) {
  return num ?
    num.toString().split('').map(i => Number(i)).reverse() : [];
}

export function getTranslateY(differ, data, _data, i) {
  let translateY = 0;
  if (!differ) {
    //不想插入40个，改变要滚到的距离；
    if (_data[i + '_add']) {
      return -(data[i] + 20);
    }
    if (_data[i + '_rem']) {
      return -data[i];
    }
    return false;
  }
  //判断相差的位数来驱动数字；差个位滚动一格，差10的部分及以上个位滚动一周；
  /*
  * 区域段
  * 0-9:0
  * 0-9:1
  * 0-9:2
  * */
  const countToString = Math.abs(differ).toString();
  const countLength = countToString.length;
  const on = _data[i];
  const to = data[i];
  if (differ > 0) {
    if (countLength - 1 > i) {
      //差值位数大于1时，参数的位置，到达减去两个参数的差，在0区域段；
      translateY = -(to - (to - on));
      //on大于to且differ大于10，如9->0,需要设计滚动到的位置＋10;
      if (on > to) {
        data[i + '_add'] = true;
      }
    } else if (countLength - 1 < i && to === on) {
      //参数不变动；
      translateY = null;
    } else if (typeof on === 'undefined') {
      //新增加入时设为0；
      translateY = -10;
    } else {
      //如果开始大于到达，到达（to）加10；
      const _to = on > to ? to + 10 : to;
      //差值为一位数时，到达减去两个参数的差，在1区域段，加10；
      translateY = -(to - (_to - on) + 10);
    }
  } else {
    if (countLength - 1 > i) {
      //差值位数大于1时，参数的位置，到达加上两个参数的差，在2区域段，加20，需要滚动一周；
      translateY = -(to + (on - to) + 20);
      //同上，differ大于10时，且to在于on
      if (to > on) {
        data[i + '_rem'] = true;
      }
    } else if (countLength - 1 < i && to === on) {
      translateY = null;
    } else {
      //如果到达大于开始，开始(on)加10;
      const _on = on < to ? on + 10 : on;
      //差值位数小于1时，参数的位置，到达减去两个参数的差，在1区域段，加10，往上滚回差值；
      translateY = -(to + (_on - to) + 10);
    }
  }
  return translateY;
}
