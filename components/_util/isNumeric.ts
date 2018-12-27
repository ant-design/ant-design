const isNumeric = <T extends number>(value: any): value is T => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

export default isNumeric;
