# 可选择

- order: 1

提供复选框操作功能。

---

````jsx
var Tree = antd.Tree;
var TreeNode = Tree.TreeNode;
var velocity = antd.velocity;

function handleCheck(info) {
  console.log('check: ', info);
}

const animation = {
  enter(node, done){
    var ok = false;

    function complete() {
      if (!ok) {
        ok = 1;
        done();
      }
    }
    node.style.display='none';
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

  leave(node, done){
    var ok = false;

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

React.render(<div>
  {React.cloneElement(<Tree defaultExpandAll={true} checkable={true} onCheck={handleCheck}>
    <TreeNode title="parent 1">
      <TreeNode title="leaf" />
      <TreeNode title="parent 1-1">
        <TreeNode title="parent 2-1">
          <TreeNode title="leaf" />
          <TreeNode title="leaf" />
        </TreeNode>
        <TreeNode title="leaf" />
      </TreeNode>
    </TreeNode>
  </Tree>, {
    openAnimation: animation,
  })}
</div>

, document.getElementById('components-tree-demo-checkbox'));
````
