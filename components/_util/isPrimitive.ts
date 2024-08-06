const isPrimitive = (value: unknown) => {
  return (typeof value !== 'object' && typeof value !== 'function') || value === null;
};

export default isPrimitive;
