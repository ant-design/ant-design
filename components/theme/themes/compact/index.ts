/* istanbul ignore file */
import type { ThemeConfig } from '../../../config-provider/context';

const compactTheme: ThemeConfig = {
  token: {
    fontSizeBase: 12,
    paddingLG: 16,
    padding: 8,
    paddingSM: 8,
    paddingXS: 4,
    paddingXXS: 0,
    // control
    controlPaddingHorizontal: 8,
    controlPaddingHorizontalSM: 4,

    marginLG: 16,
    margin: 8,
    marginSM: 8,
    marginXL: 4,
    marginXXS: 0,
    controlHeight: 28,
    controlHeightLG: 32,
    controlHeightSM: 22,
  },
  components: {
    Button: {
      _itemPaddingHorizontalSM: 8,
      _itemPaddingHorizontal: 12,
    },
    Breadcrumb: {
      fontSizeIcon: 12,
    },
    Dropdown: {},
    //  FIXME 分组item 的上下间距不对
    Menu: {
      // @menu-inline-toplevel-item-height: 32px;
      //   v4 是 8 ，现在是 4
      // FIXME：左右间距为12，现在是 8
      // @menu-item-padding: 0 12px;
      // FIXME 图标和文本之间的间距为8
      // @menu-icon-margin-right: 8px;
    },
    Checkbox: {},
    Tabs: {},
    DatePicker: {},
    Tag: {
      _itemPaddingHorizontal: 8,
    },
    Select: {},
    Radio: {},
    Switch: {},
    Slider: {},
    Rate: {},
    Progress: {},
    Message: {},
    Modal: {},
    Transfer: {
      _headerHeight: 36,
    },
    Collapse: {
      _contentPaddingHorizontal: 16,
    },
    List: {
      _itemPaddingHorizontal: 16,
      _itemPaddingVertical: 8,
      _itemPaddingHorizontalLG: 16,
      _itemPaddingVerticalLG: 12,
      _itemPaddingHorizontalSM: 12,
      _itemPaddingVerticalSM: 4,
    },
    Steps: {},
    Avatar: {},
    Notification: {},
    Anchor: {},
    Popover: {
      _itemPaddingHorizontal: 12,
      _itemPaddingVertical: 12,
    },
    Alert: {
      _itemPaddingHorizontal: 16,
      _itemPaddingVertical: 8,
      _itemPaddingVerticalLG: 12,
      _itemPaddingHorizontalLG: 20,
    },
    Card: {
      _contentPadding: 12,
      _contentPaddingSM: 12,
      _headerPaddingHorizontalSM: 12,
      _headerPaddingHorizontal: 12,
      _headerHeight: 36,
      _headerHeightSM: 32,
    },
    Table: {
      _cellPaddingVertical: 12,
    },
  },
};

export default compactTheme;
