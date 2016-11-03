---
order: 0
title:
  zh-CN: 带搜索框
  en-US: basic
---

## zh-CN

使组件带搜索框可搜索,可提供onSearch属性

## en-US

with search

````jsx
import { Tree } from 'antd'
const TreeNode = Tree.TreeNode
const data = [{
    title:'Node1',
    key: '0-0',
    children: [{
        title:'Child Node1',
        key: '0-0-0',
    },{
        title:'Child Node2',
        key: '0-0-1',
    }],
}, {
    key: '0-1',
    title:'Node2',
    children: [{
        key: '0-1-0',
        title:'Child Node3',
    }, {
        key: '0-1-1',
        title:'Child Node4',
    }, {
        key: '0-1-2',
        title:'Child Node5',
    }],
}]
class Demo extends React.Component{
    state={
      keywords: '',
      checkedKeys:[]
    }

    matcher=(title, keywords)=>title.toLowerCase().indexOf(keywords.toLowerCase()) !== -1

    filterNode=(children,title,keywords)=>{
        return this.matcher(title, keywords)||(
                children
                &&children.length
                && children.find(({children,title}) =>
                    this.filterNode(children,title, keywords))
            )
    }

    changeToTree = (data, keywords) => data.map(({children, key, title}) => {
        if (children) {
            let isShow=!keywords||this.filterNode(children,title,keywords)
            return (
                <TreeNode className={isShow?'':'tree-node-hidden'} key={key} title={title}>
                    {this.changeToTree(children, keywords)}
                </TreeNode>
            )
        } else {
            return (
                <TreeNode
                    key={key}
                    className={this.matcher(title,keywords)?'':'tree-node-hidden'}
                    title={title}/>
            )
        }
    })

    changeKeywords=e=>{
        this.setState({
          keywords:e.target.value
        })
    }

    onCheck=checkedKeys=>{
        this.setState({
            checkedKeys
        })
    }

    render(){
        let {keywords,checkedKeys}=this.state
        const treeData = this.changeToTree(data,keywords)
        return (
            <div className='container'>
                <Input
                    placeholder="关键字搜索"
                    onChange={this.changeKeywords}
                    value={keywords}/>
                <Tree
                    checkable
                    checkedKeys={checkedKeys}
                    onCheck={this.onCheck}>
                    {treeData}
                </Tree>
            </div>
        )
    }
}
ReactDOM.render(<Demo />, mountNode);
````
````css
.tree-node-hidden{
  display:none;
}
````
