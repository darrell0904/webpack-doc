# 配置 HMR 热更新

## 什么是 HMR

模块热替换（`Hot Module Replacement` 或 `HMR`）是 `webpack` 提供的最有用的功能之一, 它允许在运行时更新各种模块，而无需进行完全刷新。

一般如果我们使用了 `webpack-dev-server`，当我们修改了项目中的文件的时候，一般会重新刷新一下页面，这会导致我们刚刚在页面中操作的东西都被还原。

&nbsp;

## 举两个🌰

### `less` 中：

首先我们在修改 `index.js` 文件，下面的 `js` 代码的意思就是页面上插入一个按钮，点这个按钮的时候，生成一个 `<div>item</div>` 元素；

```javascript
import './index.less';
var btn = document.createElement('button');
btn.innerHTML = '新增';
document.body.appendChild(btn);

btn.onclick = function() {
  var div = document.createElement('div');
  div.innerHTML = 'item';
  document.body.appendChild(div);
}
```

&nbsp;

接着修改 `index.less` 文件：用于给偶数的 `item` 加一个背景色。

```less
div:nth-of-type(odd) {
  background: red;
}
```

&nbsp;

然后我们运行 `npm start`，点击 `item` 可以在页面中看到：

![](./img/hmr1.png)

&nbsp;

我们在修改一下 `index.less` 文件，

```less
div:nth-of-type(odd) {
  background: yellow;
}
```

保存后我们会发现，页码被刷新了，重置了之前的红色条纹。当再点击的时候，才会出现 黄色条纹：

![](./img/hmr2.png)

![](./img/hmr3.png)

&nbsp;

### `js` 中

我们修改一下 `index.js`，并在 `src` 下新建 `number.js` 和 `counter.js`，当作我们项目的两个模块。

* `index.js` 如下：

```javascript
// import './index.less';
// var btn = document.createElement('button');
// btn.innerHTML = '新增';
// document.body.appendChild(btn);

// btn.onclick = function() {
// 	var div = document.createElement('div');
// 	div.innerHTML = 'item';
// 	document.body.appendChild(div);
// }

import counter from './counter';
import number from './number';

counter();
number();

if(module.hot) {
  module.hot.accept('./number', () => {
    document.body.removeChild(document.getElementById('number'));
    number();
  })
}


```



* `number.js`：新建一个 `div`，并给这个 `div` 赋值 `1000`

```javascript
function number() {
  var div = document.createElement('div');
  div.setAttribute('id', 'number');
  div.innerHTML = 3000;
  document.body.appendChild(div);
}

export default number;
```



* `counter.js`：新建一个 `div`，并给这个 `div` 赋值 `1`，并给这个 `div` 添加一个点击事件，每当点击的时候，自动加一。

```javascript
function counter() {
  var div = document.createElement('div');
  div.setAttribute('id', 'counter');
  div.innerHTML = 1;
  div.onclick = function() {
    div.innerHTML = parseInt(div.innerHTML, 10) + 1
  }
  document.body.appendChild(div);
}

export default counter;
```

&nbsp;

我们重新运行 `npm start`，我们可以看到如下图：

![](./img/hmr4.png)



&nbsp;

接着我们点击 `counter.js` 导出的数字，让其变为 `16`，接着我们将 `number.js` 中的 `1000` 改为 `3000`，



![](./img/hmr5.png)

修改之后：

![](./img/hmr6.png)

我们会发现上面我们辛苦点的数字又被还原到了 `1`。

&nbsp;

要解决上面两个问题，我们就需要使用 `HMR` 了。

&nbsp;

## 配置

我们修改 `webpack.congig.js` 配置文件：

```javascript
const webpack = require('webpack');

...

module.exports = {
  ...
  devServer: {
    contentBase: './dist',
    open: true,
    port: 8080,
    hot: true,
    hotOnly: true
  },
  ...
  plugins: [
    ...
    new webpack.HotModuleReplacementPlugin()
  ],
  ...
}
```

修改完后，我们重启一下服务：`npm start`

&nbsp;

### 再看 `less`：

我们先点几下新增，如下图所示：

![](./img/hmr7.png)

接着我们将 `less` 中 `yellow` 改为 `#4caf50`，保存后回到页面：

![](./img/hmr8.png)

之前我们新增的 `item` 还在，而且颜色变成了我们修改后的样子。

&nbsp;

`less` 热更新成功



### 再看 `js`：

我们先点几下 `counter.js` 里面的数字，如下图所示：

![](./img/hmr9.png)

接着我们将 `number.js` 中的数字 `1000` 改为 `6000`，保存后回到页面：

![](./img/hmr10.png)

之前我们新增的 `16` 还在，但是数字没有变成 `6000`：

&nbsp;

这是因为我们还需要再 `index.js` 代码中加上一行代码：

```javascript
if(module.hot) {
  module.hot.accept('./number', () => {
    document.body.removeChild(document.getElementById('number'));
    number();
  })
}
```

上面的的代码意思就是 如果我们开启了热更新，并且我们发现 `number.js` 有变动的话，我们就重新的把原来的 `number.js` 创建的 `<div>` 删除，并重新运行一下 `number.js`

&nbsp;

重新起一下服务，在按照上面的步骤操作一下，我们发现新增的 `16` 还在，数字也改成了 `6000`：

![](./img/hmr11.png)

&nbsp;

那么为什么我们在打包 `less` 的时候就不需要写着一行代码呢，其实是因为 `css-loader` 默认已经帮我们做了这一件事情了，其中我们经常使用 `React`、`vue` 框架他们的底层已经帮我们做好了这些事情，所以我们在代码上面基本上没有看到过类似上面的代码。

&nbsp; 

至此， `js` 热更新成功。

&nbsp;

## 实现原理

来看一张图，如下：

![](./img/hmr12.png)

先来讲几个概念：

* `File System`

代表我们的文件系统，里面有我们的所有代码文件

* `Webpack Compile`

`Webpack` 的编译器，将 `JS` 编译成 `Bundle` 

* `HMR Server`

将热更新的文件输出给 `HMR Rumtime`

* `Bundle server`

提供文件在浏览器器的访问

* `HMR Rumtime`

客户端 `HMR` 的中枢，用来更新文件的变化，与 `HMR server` 通过 `websocket` 保持长链接，由此传输热更新的文件

* `bundle.js`

代表构建出来的文件

&nbsp;

### 大致流程

分为两个流程，一个是文件系统的文件通过 `webpack` 的编译器进行编译，接着被放到 `Bundle Server` 服务器上，也就是 `1 -> 2 -> A -> B` 的流程；

第二个流程是，当文件系统发生改变的时候，`Webpack` 会重新编译，将更新后的代码发送给了 `HMR SServer`，接着便通知给了 `HMR Runtime`，一般来说热更新的文件或者说是 `module` 是以 `json` 的形式传输给 浏览器的 `HMR Runtime` 的，最终 `HMR Runtime` 就会更新我们前端的代码。

更加详细的解读大家可以参考 [HMR 原理](https://zhuanlan.zhihu.com/p/30669007)，写的巨详细。

&nbsp;

## 相关链接

* [HMR 使用](https://webpack.js.org/concepts/hot-module-replacement/)
* [HMR 相关API](https://webpack.js.org/api/hot-module-replacement/)
* [HMR 原理](https://zhuanlan.zhihu.com/p/30669007)

&nbsp;

## 示例代码

示例代码可以看这里：

* [HMR 示例代码](https://github.com/darrell0904/webpack-study-demo/tree/master/chapter1/HMR-demo)