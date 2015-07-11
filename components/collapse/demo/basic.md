# 折叠面板

- order: 0

默认打开第二个面板。

---

````jsx
var Collapse = antd.Collapse;
var Panel = Collapse.Panel;

function callback(key) {
  console.log(key);
}

var text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

React.render(
  <Collapse defaultActiveKey={["2"]} onChange={callback}>
    <Panel header={`This is panel header 1`} key="1">
      <p>{text}</p>
    </Panel>
    <Panel header={`This is panel header 2`} key="2">
      <p>{text}</p>
    </Panel>
    <Panel header={`This is panel header 3`} key="3">
      <p>{text}</p>
    </Panel>
  </Collapse>
, document.getElementById('components-collapse-demo-basic'));
````
