"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFullKeyList = getFullKeyList;
exports.calcRangeKeys = calcRangeKeys;

var _util = require("rc-tree/lib/util");

var Record;

(function (Record) {
  Record[Record["None"] = 0] = "None";
  Record[Record["Start"] = 1] = "Start";
  Record[Record["End"] = 2] = "End";
})(Record || (Record = {})); // TODO: Move this logic into `rc-tree`


function traverseNodesKey(rootChildren, callback) {
  var nodeList = (0, _util.getNodeChildren)(rootChildren) || [];

  function processNode(node) {
    var key = node.key,
        children = node.props.children;

    if (callback(key) !== false) {
      traverseNodesKey(children, callback);
    }
  }

  nodeList.forEach(processNode);
}

function getFullKeyList(children) {
  var _convertTreeToEntitie = (0, _util.convertTreeToEntities)(children),
      keyEntities = _convertTreeToEntitie.keyEntities;

  return Object.keys(keyEntities);
}
/** 计算选中范围，只考虑expanded情况以优化性能 */


function calcRangeKeys(rootChildren, expandedKeys, startKey, endKey) {
  var keys = [];
  var record = Record.None;

  if (startKey && startKey === endKey) {
    return [startKey];
  }

  if (!startKey || !endKey) {
    return [];
  }

  function matchKey(key) {
    return key === startKey || key === endKey;
  }

  traverseNodesKey(rootChildren, function (key) {
    if (record === Record.End) {
      return false;
    }

    if (matchKey(key)) {
      // Match test
      keys.push(key);

      if (record === Record.None) {
        record = Record.Start;
      } else if (record === Record.Start) {
        record = Record.End;
        return false;
      }
    } else if (record === Record.Start) {
      // Append selection
      keys.push(key);
    }

    if (expandedKeys.indexOf(key) === -1) {
      return false;
    }

    return true;
  });
  return keys;
}