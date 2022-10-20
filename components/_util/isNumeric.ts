const isNumeric = (value: any): boolean => !Number.isNaN(parseFloat(value)) && isFinite(value);

export default isNumeric;
