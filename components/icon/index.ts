import { devUseWarning } from '../_util/warning';

const Icon: React.FC = () => {
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning();

    warning(false, 'Icon', 'usage', 'Empty Icon');
  }
  return null;
};

export default Icon;
