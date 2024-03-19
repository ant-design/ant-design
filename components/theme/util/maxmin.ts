import { unit } from '@ant-design/cssinjs';

export default function genMaxMin(type: 'css' | 'js') {
  if (type === 'js') {
    return {
      max: Math.max,
      min: Math.min,
    };
  }
  return {
    max: (...args: (string | number)[]) => `max(${args.map((value) => unit(value)).join(',')})`,
    min: (...args: (string | number)[]) => `min(${args.map((value) => unit(value)).join(',')})`,
  };
}
