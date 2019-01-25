function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
  }
  return t;
};

import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import debounce from 'lodash/debounce';
import { conductExpandParent, convertTreeToEntities } from "rc-tree/es/util";
import { ConfigConsumer } from '../config-provider';
import Tree from './Tree';
import { calcRangeKeys, getFullKeyList } from './util';
import Icon from '../icon';

function getIcon(props) {
  var isLeaf = props.isLeaf,
      expanded = props.expanded;

  if (isLeaf) {
    return React.createElement(Icon, {
      type: "file"
    });
  }

  return React.createElement(Icon, {
    type: expanded ? 'folder-open' : 'folder'
  });
}

var DirectoryTree =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DirectoryTree, _React$Component);

  function DirectoryTree(props) {
    var _this;

    _classCallCheck(this, DirectoryTree);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DirectoryTree).call(this, props));

    _this.onExpand = function (expandedKeys, info) {
      var onExpand = _this.props.onExpand;

      _this.setUncontrolledState({
        expandedKeys: expandedKeys
      }); // Call origin function


      if (onExpand) {
        return onExpand(expandedKeys, info);
      }

      return undefined;
    };

    _this.onClick = function (event, node) {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          expandAction = _this$props.expandAction; // Expand the tree

      if (expandAction === 'click') {
        _this.onDebounceExpand(event, node);
      }

      if (onClick) {
        onClick(event, node);
      }
    };

    _this.onDoubleClick = function (event, node) {
      var _this$props2 = _this.props,
          onDoubleClick = _this$props2.onDoubleClick,
          expandAction = _this$props2.expandAction; // Expand the tree

      if (expandAction === 'doubleClick') {
        _this.onDebounceExpand(event, node);
      }

      if (onDoubleClick) {
        onDoubleClick(event, node);
      }
    };

    _this.onSelect = function (keys, event) {
      var _this$props3 = _this.props,
          onSelect = _this$props3.onSelect,
          multiple = _this$props3.multiple,
          children = _this$props3.children;
      var _this$state$expandedK = _this.state.expandedKeys,
          expandedKeys = _this$state$expandedK === void 0 ? [] : _this$state$expandedK;
      var node = event.node,
          nativeEvent = event.nativeEvent;
      var _node$props$eventKey = node.props.eventKey,
          eventKey = _node$props$eventKey === void 0 ? '' : _node$props$eventKey;
      var newState = {}; // Windows / Mac single pick

      var ctrlPick = nativeEvent.ctrlKey || nativeEvent.metaKey;
      var shiftPick = nativeEvent.shiftKey; // Generate new selected keys

      var newSelectedKeys;

      if (multiple && ctrlPick) {
        // Control click
        newSelectedKeys = keys;
        _this.lastSelectedKey = eventKey;
        _this.cachedSelectedKeys = newSelectedKeys;
      } else if (multiple && shiftPick) {
        // Shift click
        newSelectedKeys = Array.from(new Set([].concat(_toConsumableArray(_this.cachedSelectedKeys || []), _toConsumableArray(calcRangeKeys(children, expandedKeys, eventKey, _this.lastSelectedKey)))));
      } else {
        // Single click
        newSelectedKeys = [eventKey];
        _this.lastSelectedKey = eventKey;
        _this.cachedSelectedKeys = newSelectedKeys;
      }

      newState.selectedKeys = newSelectedKeys;

      if (onSelect) {
        onSelect(newSelectedKeys, event);
      }

      _this.setUncontrolledState(newState);
    };

    _this.setTreeRef = function (node) {
      _this.tree = node;
    };

    _this.expandFolderNode = function (event, node) {
      var isLeaf = node.props.isLeaf;

      if (isLeaf || event.shiftKey || event.metaKey || event.ctrlKey) {
        return;
      } // Get internal rc-tree


      var internalTree = _this.tree.tree; // Call internal rc-tree expand function
      // https://github.com/ant-design/ant-design/issues/12567

      internalTree.onNodeExpand(event, node);
    };

    _this.setUncontrolledState = function (state) {
      var newState = omit(state, Object.keys(_this.props));

      if (Object.keys(newState).length) {
        _this.setState(newState);
      }
    };

    _this.renderDirectoryTree = function (_ref) {
      var getPrefixCls = _ref.getPrefixCls;

      var _a = _this.props,
          customizePrefixCls = _a.prefixCls,
          className = _a.className,
          props = __rest(_a, ["prefixCls", "className"]);

      var _this$state = _this.state,
          expandedKeys = _this$state.expandedKeys,
          selectedKeys = _this$state.selectedKeys;
      var prefixCls = getPrefixCls('tree', customizePrefixCls);
      var connectClassName = classNames("".concat(prefixCls, "-directory"), className);
      return React.createElement(Tree, _extends({
        icon: getIcon,
        ref: _this.setTreeRef
      }, props, {
        prefixCls: prefixCls,
        className: connectClassName,
        expandedKeys: expandedKeys,
        selectedKeys: selectedKeys,
        onSelect: _this.onSelect,
        onClick: _this.onClick,
        onDoubleClick: _this.onDoubleClick,
        onExpand: _this.onExpand
      }));
    };

    var defaultExpandAll = props.defaultExpandAll,
        defaultExpandParent = props.defaultExpandParent,
        expandedKeys = props.expandedKeys,
        defaultExpandedKeys = props.defaultExpandedKeys,
        children = props.children;

    var _convertTreeToEntitie = convertTreeToEntities(children),
        keyEntities = _convertTreeToEntitie.keyEntities; // Selected keys


    _this.state = {
      selectedKeys: props.selectedKeys || props.defaultSelectedKeys || []
    }; // Expanded keys

    if (defaultExpandAll) {
      _this.state.expandedKeys = getFullKeyList(props.children);
    } else if (defaultExpandParent) {
      _this.state.expandedKeys = conductExpandParent(expandedKeys || defaultExpandedKeys, keyEntities);
    } else {
      _this.state.expandedKeys = expandedKeys || defaultExpandedKeys;
    }

    _this.onDebounceExpand = debounce(_this.expandFolderNode, 200, {
      leading: true
    });
    return _this;
  }

  _createClass(DirectoryTree, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if ('expandedKeys' in nextProps) {
        this.setState({
          expandedKeys: nextProps.expandedKeys
        });
      }

      if ('selectedKeys' in nextProps) {
        this.setState({
          selectedKeys: nextProps.selectedKeys
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(ConfigConsumer, null, this.renderDirectoryTree);
    }
  }]);

  return DirectoryTree;
}(React.Component);

export { DirectoryTree as default };
DirectoryTree.defaultProps = {
  showIcon: true,
  expandAction: 'click'
};