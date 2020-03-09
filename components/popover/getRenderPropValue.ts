import { RenderFunction } from '../tooltip';

const getRenderPropValue = (propValue?: React.ReactNode | RenderFunction): React.ReactNode => {
  if (!propValue) {
    return null;
  }

  const isRenderFunction = typeof propValue === 'function';
  if (isRenderFunction) {
    return (propValue as RenderFunction)();
  }

  return propValue;
};

export default getRenderPropValue;
