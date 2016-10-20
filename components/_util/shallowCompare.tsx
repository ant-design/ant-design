import shallowequal from 'shallowequal';

export default function shallowCompare(instance, nextProps, nextState) {
  return (
    !shallowequal(instance.props, nextProps) ||
    !shallowequal(instance.state, nextState)
  );
}
