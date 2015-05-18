# 失效

- description: 灰色的

---

````jsx
var Button = React.createClass({
  render: function() {
    return <button disabled>{this.props.children}</button>;
  }
});

React.render(
  <Button>失效的按钮</Button>
  , document.getElementById('components-button-demo-disabled'));
````
