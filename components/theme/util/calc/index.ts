import NumCalculator from './NumCalculator';
import CSSCalculator from './CSSCalculator';

const calc = (type: 'css' | 'js') => {
  const Calculator = type === 'css' ? CSSCalculator : NumCalculator;

  return (num: any) => new Calculator(num);
};

export default calc;
