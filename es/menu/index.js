function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import * as React from 'react';
import RcMenu, { Divider, ItemGroup } from 'rc-menu';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import SubMenu from './SubMenu';
import Item from './MenuItem';
import { ConfigConsumer } from '../config-provider';
import animation from '../_util/openAnimation';
import warning from '../_util/warning';

var Menu =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Menu, _React$Component);

  function Menu(props) {
    var _this;

    _classCallCheck(this, Menu);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Menu).call(this, props));
    _this.inlineOpenKeys = []; // Restore vertical mode when menu is collapsed responsively when mounted
    // https://github.com/ant-design/ant-design/issues/13104
    // TODO: not a perfect solution, looking a new way to avoid setting switchingModeFromInline in this situation

    _this.handleMouseEnter = function (e) {
      _this.restoreModeVerticalFromInline();

      var onMouseEnter = _this.props.onMouseEnter;

      if (onMouseEnter) {
        onMouseEnter(e);
      }
    };

    _this.handleTransitionEnd = function (e) {
      // when inlineCollapsed menu width animation finished
      // https://github.com/ant-design/ant-design/issues/12864
      var widthCollapsed = e.propertyName === 'width' && e.target === e.currentTarget; // Fix for <Menu style={{ width: '100%' }} />, the width transition won't trigger when menu is collapsed
      // https://github.com/ant-design/ant-design-pro/issues/2783

      var iconScaled = e.propertyName === 'font-size' && e.target.className.indexOf('anticon') >= 0;

      if (widthCollapsed || iconScaled) {
        _this.restoreModeVerticalFromInline();
      }
    };

    _this.handleClick = function (e) {
      _this.handleOpenChange([]);

      var onClick = _this.props.onClick;

      if (onClick) {
        onClick(e);
      }
    };

    _this.handleOpenChange = function (openKeys) {
      _this.setOpenKeys(openKeys);

      var onOpenChange = _this.props.onOpenChange;

      if (onOpenChange) {
        onOpenChange(openKeys);
      }
    };

    _this.renderMenu = function (_ref) {
      var getPopupContainer = _ref.getPopupContainer,
          getPrefixCls = _ref.getPrefixCls;
      var _this$props = _this.props,
          customizePrefixCls = _this$props.prefixCls,
          className = _this$props.className,
          theme = _this$props.theme;

      var menuMode = _this.getRealMenuMode();

      var menuOpenAnimation = _this.getMenuOpenAnimation(menuMode);

      var prefixCls = getPrefixCls('menu', customizePrefixCls);
      var menuClassName = classNames(className, "".concat(prefixCls, "-").concat(theme), _defineProperty({}, "".concat(prefixCls, "-inline-collapsed"), _this.getInlineCollapsed()));
      var menuProps = {
        openKeys: _this.state.openKeys,
        onOpenChange: _this.handleOpenChange,
        className: menuClassName,
        mode: menuMode
      };

      if (menuMode !== 'inline') {
        // closing vertical popup submenu after click it
        menuProps.onClick = _this.handleClick;
        menuProps.openTransitionName = menuOpenAnimation;
      } else {
        menuProps.openAnimation = menuOpenAnimation;
      } // https://github.com/ant-design/ant-design/issues/8587


      var collapsedWidth = _this.context.collapsedWidth;

      if (_this.getInlineCollapsed() && (collapsedWidth === 0 || collapsedWidth === '0' || collapsedWidth === '0px')) {
        return null;
      }

      return React.createElement(RcMenu, _extends({
        getPopupContainer: getPopupContainer
      }, _this.props, menuProps, {
        prefixCls: prefixCls,
        onTransitionEnd: _this.handleTransitionEnd,
        onMouseEnter: _this.handleMouseEnter
      }));
    };

    warning(!('onOpen' in props || 'onClose' in props), '`onOpen` and `onClose` are removed, please use `onOpenChange` instead, ' + 'see: https://u.ant.design/menu-on-open-change.');
    warning(!('inlineCollapsed' in props && props.mode !== 'inline'), "`inlineCollapsed` should only be used when Menu's `mode` is inline.");
    var openKeys;

    if ('openKeys' in props) {
      openKeys = props.openKeys;
    } else if ('defaultOpenKeys' in props) {
      openKeys = props.defaultOpenKeys;
    }

    _this.state = {
      openKeys: openKeys || []
    };
    return _this;
  }

  _createClass(Menu, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        inlineCollapsed: this.getInlineCollapsed(),
        antdMenuTheme: this.props.theme
      };
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps, nextContext) {
      if (this.props.mode === 'inline' && nextProps.mode !== 'inline') {
        this.switchingModeFromInline = true;
      }

      if ('openKeys' in nextProps) {
        this.setState({
          openKeys: nextProps.openKeys
        });
        return;
      }

      if (nextProps.inlineCollapsed && !this.props.inlineCollapsed || nextContext.siderCollapsed && !this.context.siderCollapsed) {
        this.switchingModeFromInline = true;
        this.inlineOpenKeys = this.state.openKeys;
        this.setState({
          openKeys: []
        });
      }

      if (!nextProps.inlineCollapsed && this.props.inlineCollapsed || !nextContext.siderCollapsed && this.context.siderCollapsed) {
        this.setState({
          openKeys: this.inlineOpenKeys
        });
        this.inlineOpenKeys = [];
      }
    }
  }, {
    key: "restoreModeVerticalFromInline",
    value: function restoreModeVerticalFromInline() {
      if (this.switchingModeFromInline) {
        this.switchingModeFromInline = false;
        this.setState({});
      }
    }
  }, {
    key: "setOpenKeys",
    value: function setOpenKeys(openKeys) {
      if (!('openKeys' in this.props)) {
        this.setState({
          openKeys: openKeys
        });
      }
    }
  }, {
    key: "getRealMenuMode",
    value: function getRealMenuMode() {
      var inlineCollapsed = this.getInlineCollapsed();

      if (this.switchingModeFromInline && inlineCollapsed) {
        return 'inline';
      }

      var mode = this.props.mode;
      return inlineCollapsed ? 'vertical' : mode;
    }
  }, {
    key: "getInlineCollapsed",
    value: function getInlineCollapsed() {
      var inlineCollapsed = this.props.inlineCollapsed;

      if (this.context.siderCollapsed !== undefined) {
        return this.context.siderCollapsed;
      }

      return inlineCollapsed;
    }
  }, {
    key: "getMenuOpenAnimation",
    value: function getMenuOpenAnimation(menuMode) {
      var _this$props2 = this.props,
          openAnimation = _this$props2.openAnimation,
          openTransitionName = _this$props2.openTransitionName;
      var menuOpenAnimation = openAnimation || openTransitionName;

      if (openAnimation === undefined && openTransitionName === undefined) {
        if (menuMode === 'horizontal') {
          menuOpenAnimation = 'slide-up';
        } else if (menuMode === 'inline') {
          menuOpenAnimation = animation;
        } else {
          // When mode switch from inline
          // submenu should hide without animation
          if (this.switchingModeFromInline) {
            menuOpenAnimation = '';
            this.switchingModeFromInline = false;
          } else {
            menuOpenAnimation = 'zoom-big';
          }
        }
      }

      return menuOpenAnimation;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(ConfigConsumer, null, this.renderMenu);
    }
  }]);

  return Menu;
}(React.Component);

export { Menu as default };
Menu.Divider = Divider;
Menu.Item = Item;
Menu.SubMenu = SubMenu;
Menu.ItemGroup = ItemGroup;
Menu.defaultProps = {
  className: '',
  theme: 'light',
  focusable: false
};
Menu.childContextTypes = {
  inlineCollapsed: PropTypes.bool,
  antdMenuTheme: PropTypes.string
};
Menu.contextTypes = {
  siderCollapsed: PropTypes.bool,
  collapsedWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};