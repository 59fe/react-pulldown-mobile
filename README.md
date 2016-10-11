## React-pulldown-mobile
一个简单易用的React下拉组件

<font color=#ff0000 size=14>还在调试中，请勿使用</font>

### 使用示例

```
import React, { Component } from 'react'
import PullDown from 'react-pulldown-mobile'

class PullDownDemo extends Component {

  render() {

    return (
      <div className="container">
        <PullDown
          tip="下拉试试"
          onPullDown={() => {
            console.log('下拉完成')
          }}
          onPullCancel={() => {
            console.log('下拉取消')
          }}
        >
          <div className="contents">
		  {new Array(30).fill('').map((v, i) => {
		  	return <div key={i} className="item"></div>
		  })}
          </div>
        </PullDown>
      </div>
    )

  }

}

ReactDOM.render(<PullDownDemo />, document.querySelector('#root'));
```

###### 默认情况下，.container元素作为下拉容器，需要指定高度并设置overflow为auto或者scroll;

```
html,body{
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #fff;
}
#root{
  height: 100%;
}
.container{
  height: 100%;
  overflow: auto;
}

.item{
  height: 40px;
  background-color: #eee;
  margin-bottom: 3px;
}
```

### 组件属性
| 属性名                  | 值            |说明   |
| ---------------------- | ------------- | ----- |
| container| String | 下拉容器的querySelector选择器字符串，默认是当前父元素 |
| tip| String | 下拉露出的顶部区域的提示文字 |
| threshold | Number | 下拉完成阈值，默认是200 |
| sensitivity | Number | 下拉灵敏度，请传入0.1-1的数字，默认是0.4 |
| onPullCancel | Function | 取消下拉后执行的回调函数 |
| onPullDown | Function | 达到下拉阈值后执行的回调函数 |