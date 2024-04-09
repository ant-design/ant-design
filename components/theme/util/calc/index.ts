import type AbstractCalculator from './calculator';
import CSSCalculator from './CSSCalculator';
import NumCalculator from './NumCalculator';

const genCalc = (type: 'css' | 'js') => {
  const Calculator = type === 'css' ? CSSCalculator : NumCalculator;

  return (num: number | string | AbstractCalculator) => new Calculator(num);
};

export default genCalc;
