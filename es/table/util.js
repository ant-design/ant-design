function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
export function flatArray() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var childrenName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'children';
  var result = [];

  var loop = function loop(array) {
    array.forEach(function (item) {
      if (item[childrenName]) {
        var newItem = _extends({}, item);

        delete newItem[childrenName];
        result.push(newItem);

        if (item[childrenName].length > 0) {
          loop(item[childrenName]);
        }
      } else {
        result.push(item);
      }
    });
  };

  loop(data);
  return result;
}
export function treeMap(tree, mapper) {
  var childrenName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
  return tree.map(function (node, index) {
    var extra = {};

    if (node[childrenName]) {
      extra[childrenName] = treeMap(node[childrenName], mapper, childrenName);
    }

    return _extends({}, mapper(node, index), extra);
  });
}
export function flatFilter(tree, callback) {
  return tree.reduce(function (acc, node) {
    if (callback(node)) {
      acc.push(node);
    }

    if (node.children) {
      var children = flatFilter(node.children, callback);
      acc.push.apply(acc, _toConsumableArray(children));
    }

    return acc;
  }, []);
}
export function normalizeColumns(elements) {
  var columns = [];
  React.Children.forEach(elements, function (element) {
    if (!React.isValidElement(element)) {
      return;
    }

    var column = _extends({}, element.props);

    if (element.key) {
      column.key = element.key;
    }

    if (element.type && element.type.__ANT_TABLE_COLUMN_GROUP) {
      column.children = normalizeColumns(column.children);
    }

    columns.push(column);
  });
  return columns;
}