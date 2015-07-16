# 基本用法

- order: 2

联动 checkbox。

---

````jsx
var Checkbox = antd.Checkbox;

var container = document.getElementById('components-checkbox-demo-controller');

var App = React.createClass({
    getInitialState(){
        return {
            checked:true,
            disabled:false
        }
    },
    render(){
        var label = (this.state.checked ? "选中":"取消") + "-" + (this.state.disabled ? "不可用":"可用");
        return <ul>
            <li>
                <label><Checkbox checked={this.state.checked} disabled={this.state.disabled} onChange={this.onChange}/>
                {label}
                </label>
            </li>
            <li>
                <button className="ant-btn ant-btn-primary ant-btn-sm" onClick={this.toggleChecked}>
                    {!this.state.checked ? "选中":"取消"}
                </button>

                <button style={{"marginLeft":"10px"}} className="ant-btn ant-btn-primary ant-btn-sm" onClick={this.toggleDisable}>
                                    {!this.state.disabled ? "不可用":"可用"}
                </button>
            </li>

        </ul>;
    },
    toggleChecked(e){
        this.setState({checked:!this.state.checked});
    },
    toggleDisable(e){
        this.setState({disabled:!this.state.disabled});
    },
    onChange(checked){
        console.log('checked = ',checked);
        this.setState({checked:checked});
    }

});

React.render(<App />, container);
````
