const isPrimitive = (value: unknown) => (typeof value !== 'object' && typeof value !== 'function') || value === null;

export default isPrimitive;
