import Divider, { DividerProps } from './Divider';
import Group from './Group';

interface CompoundedComponent extends React.FC<DividerProps> {
  Group: typeof Group;
}

const InternalDivider = Divider as CompoundedComponent;

InternalDivider.Group = Group;

export default InternalDivider;
