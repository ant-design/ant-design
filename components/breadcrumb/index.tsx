import InternalBreadcrumb from './Breadcrumb';
import BreadcrumbItem from './BreadcrumbItem';
import BreadcrumbSeparator from './BreadcrumbSeparator';

export type { BreadcrumbProps, BreadcrumbSemanticAllType } from './Breadcrumb';
export type { BreadcrumbItemProps, SeparatorType } from './BreadcrumbItem';

type CompoundedComponent = typeof InternalBreadcrumb & {
  /** @deprecated Please use `items` instead. */
  Item: typeof BreadcrumbItem;
  /** @deprecated Please use `separator` instead. */
  Separator: typeof BreadcrumbSeparator;
};

const Breadcrumb = InternalBreadcrumb as CompoundedComponent;

Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.Separator = BreadcrumbSeparator;

export default Breadcrumb;
