# 打包 React 代码

如今前端框架三足鼎立，`react` 是我们必须要学习的代码。这一节来讲一下如何打包 `react` 代码。



## 先写点 `react`

* 首先安装 `react`、`react-dom`

```javascript
npm install react react-dom -S
```

* 然后在 `src/index.js` 中写点 `react` 代码

```jsx
import React, { Component } from 'react';
import ReactDom from 'react-dom';

class App extends Component {
	render() {
		return (
			<div>
				hello，React！！！
			</div>
		)
	}
}

ReactDom.render(<App />, document.getElementById('root'));
```

然后我们试着运行 `npm start`，打包报错了，想想肯定也是，因为我们没有在配置文件里面告诉 `webpack` 碰到 `react` 代码需要怎么打包。



## 配置 `babel`

* 下载解析 `react` 代码的 `babel` 依赖

```javascript
npm install @babel/preset-react -D
```

* 修改 `.babelrc` 文件

```json
{
	"presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage"
      }
    ],
    "@babel/preset-react"
  ]
}
```

我们重新运行 `npm start`，我们会发现在页面上打印出了：`hello，React！！！`

![](./img/react1.png)



## 相关链接

* [@babel/preset-react](https://www.babeljs.cn/docs/babel-preset-react)



## 示例代码

示例代码可以看这里：

* [打包 React  示例代码]()

