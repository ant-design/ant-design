const isNumeric = (value: any): boolean => !isNaN(parseFloat(value)) && isFinite(value);

export default isNumeric;
