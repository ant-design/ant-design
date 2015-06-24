# rc-tabs
---

react steps component



## Screenshot

<img src='http://gtms03.alicdn.com/tps/i3/TB1TIJ3HXXXXXcYaXXXR6PQLFXX-816-612.png' width='408'>

## install

## Feature

## Usage

```js
var Steps = require('rc-steps');

React.render(
  (
    <Tabs defaultActiveKey="2" onChange={callback}>
      <Steps.Stpe tab='tab 1' key="1">first</TabPane>
      <TabPane tab='tab 2' key="2">second</TabPane>
      <TabPane tab='tab 3' key="3">third</TabPane>
    </Tabs>
  ),
  document.getElementById('t2'));
```

## API 

### Tabs

#### props:

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th>default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
      <tr>
          <td>activeKey</td>
          <td>String</td>
          <th></th>
          <td>current active tabPanel's key</td>
      </tr>
      <tr>
          <td>animation</td>
          <td>String</td>
          <th></th>
          <td>tabPane's animation. current only support slide-horizontal in assets/index.css</td>
      </tr>
      <tr>
          <td>defaultActiveKey</td>
          <td>String</td>
          <th>first active tabPanel's key</th>
          <td>initial active tabPanel's key if activeKey is absent</td>
      </tr>
      <tr>
          <td>onChange</td>
          <td>Function(key)</td>
          <th></th>
          <td>called when tabPanel is changed</td>
      </tr>
      <tr>
          <td>onTabClick</td>
          <td>Function(key)</td>
          <th></th>
          <td>called when tab is clicked</td>
      </tr>
    </tbody>
</table>

### TabPane

#### props:

<table class="table table-bordered table-striped">
    <thead>
      <tr>
          <th style="width: 100px;">name</th>
          <th style="width: 50px;">type</th>
          <th>default</th>
          <th>description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
          <td>key</td>
          <td>Object</td>
          <th></th>
          <td>corresponding to activeKey</td>
      </tr>
      <tr>
          <td>tab</td>
          <td>String</td>
          <th></th>
          <td>current tab's title corresponding to current tabPane</td>
      </tr>
    </tbody>
</table>


## Development

```
npm install
npm start
```

## Example

http://localhost:8000/examples

online example: http://react-component.github.io/tabs/examples/

## Test Case

http://localhost:8000/tests/runner.html?coverage

## Coverage

http://localhost:8000/node_modules/node-jscover/lib/front-end/jscoverage.html?w=http://localhost:8000/tests/runner.html?coverage

## License

rc-tabs is released under the MIT license.