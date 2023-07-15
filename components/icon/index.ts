import warning from '../_util/warning';

const Icon: React.FC = () => {
  if (process.env.NODE_ENV !== 'production') {
    warning(false, 'Icon', 'Empty Icon');
  }
  return null;
};

export default Icon;
