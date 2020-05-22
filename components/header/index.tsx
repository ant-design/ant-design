import OriginalHeader, { HeaderColumns, HeaderTitle } from './Header';

export type HeaderProps = typeof OriginalHeader & {
  HeaderColumns: typeof HeaderColumns;
  HeaderTitle: typeof HeaderTitle;
};

const Header = OriginalHeader as HeaderProps;
Header.HeaderColumns = HeaderColumns;
Header.HeaderTitle = HeaderTitle;

export default Header;
