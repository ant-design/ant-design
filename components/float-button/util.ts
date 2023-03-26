const getOffset = (radius: number): number => {
  if (radius === 0) {
    return 0;
  }
  // 如果要考虑通用性，这里应该用三角函数 Math.sin(45)
  // 但是这个场景比较特殊，始终是等腰直角三角形，所以直接用 Math.sqrt() 开方即可
  return radius - Math.sqrt(radius ** 2 / 2);
};

export default getOffset;
