import React from 'react';
import Tree from 'rc-tree';
import velocity from 'velocity-animate';

const animation = {
  enter(node, done){
    var ok = false;

    function complete() {
      if (!ok) {
        ok = 1;
        done();
      }
    }

    node.style.display = 'none';
    velocity(node, 'slideDown', {
      duration: 300,
      complete: complete
    });
    return {
      stop: function () {
        velocity(node, 'finish');
        // velocity complete is async
        complete();
      }
    };
  },

  appear(){
    return this.enter.apply(this, arguments);
  },

  leave(node, done){
    var ok = false;

    node.style.display = 'block';

    function complete() {
      if (!ok) {
        ok = 1;
        done();
      }
    }

    velocity(node, 'slideUp', {
      duration: 300,
      complete: complete
    });
    return {
      stop: function () {
        velocity(node, 'finish');
        // velocity complete is async
        complete();
      }
    };
  },
};

const AntTree = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-tree',
      checkable: false,
      showIcon: false,
    };
  },
  render() {
    const props = this.props;
    let checkable = props.checkable;
    if (checkable) {
      checkable = <span className={`${props.prefixCls}-checkbox-inner`}></span>;
    }
    return <Tree openAnimation={animation} {...props} checkable={checkable}>
      {this.props.children}
    </Tree>;
  }
});

AntTree.TreeNode = Tree.TreeNode;
export default AntTree;
