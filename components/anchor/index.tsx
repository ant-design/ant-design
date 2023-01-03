import InternalAnchor from './Anchor';
import AnchorLink from './AnchorLink';

export { AnchorProps } from './Anchor';
export { AnchorLinkProps } from './AnchorLink';

type InternalAnchorType = typeof InternalAnchor;

type CompoundedComponent = InternalAnchorType & {
  Link: typeof AnchorLink;
};

const Anchor = InternalAnchor as CompoundedComponent;

Anchor.Link = AnchorLink;
export default Anchor;
