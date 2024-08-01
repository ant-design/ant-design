import Panel from './Panel';
import SplitterComp from './Splitter';

export type { SplitterProps } from './Splitter';

type CompoundedComponent = typeof SplitterComp & {
  Panel: typeof Panel;
};

const Splitter = SplitterComp as CompoundedComponent;
Splitter.Panel = Panel;

export default Splitter;
