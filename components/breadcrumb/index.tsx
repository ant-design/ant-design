import InternalBreadcrumb from './Breadcrumb';
import BreadcrumbItem from './BreadcrumbItem';
import BreadcrumbSeparator from './BreadcrumbSeparator';

export type { BreadcrumbProps } from './Breadcrumb';
export type { BreadcrumbItemProps, SeparatorType } from './BreadcrumbItem';

type CompoundedComponent = typeof InternalBreadcrumb & {
  Item: typeof BreadcrumbItem;
  Separator: typeof BreadcrumbSeparator;
};

const Breadcrumb = InternalBreadcrumb as CompoundedComponent;

Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.Separator = BreadcrumbSeparator;

export default Breadcrumb;
