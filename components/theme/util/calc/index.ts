import NumCalculator from './NumCalculator';
import CSSCalculator from './CSSCalculator';

const genCalc = (type: 'css' | 'js') => {
  const Calculator = type === 'css' ? CSSCalculator : NumCalculator;

  return (num: any) => new Calculator(num);
};

export default genCalc;
