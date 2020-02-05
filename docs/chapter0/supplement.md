# 一些补充

## 模块化

我们之前提到代码没有模块化之前会碰到一些问题，比如 项目一大，无法合理的管理项目的依赖和版本、无法方便的控制依赖的加载顺序等，这里我们举一个例子：

首先我们建一个 `index.html` :

```html
// index.html

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>模块化问题例子</title>
</head>
<body>
  <p>网页内容</p>
  <div id='root'></div>
  <script src='./index.js'></script>
</body>
</html>

```

一个 `index.js`：

```javascript
var dom = document.getElementById('root');

var content = document.createElement('div');
content.innerText = '文章内容';
dom.append(content);
```



网页上会如图所示：

![例子](./img/0.png)



当我们的项目渐渐的大起来的时候，增加了各种各样的功能，比如我们要加一个 `header`，加一个 `sidebar`，我们便会在 `index.js` 中这样写：

```javascript
var dom = document.getElementById('root');

var header = document.createElement('div');
header.innerText = '头部内容';
dom.append(header);

var sidebar = document.createElement('div');
sidebar.innerText = '侧边栏内容';
dom.append(sidebar);

var content = document.createElement('div');
content.innerText = '文章内容';
dom.append(content);
```



这个时候我们就会想把这个文件进行拆分：我们拆成 三个文件 `header.js`、`content.js`、`sidebar.js`，并在 `index.js` 中进行调用

```javascript
// header.js
function Header() {
  var header = document.createElement('div');
  header.innerText = '头部内容';
  dom.append(header);
}

// content.js
function Content() {
  var content = document.createElement('div');
  content.innerText = '文章内容';
  dom.append(content);
}

// sidebar.js
function Sidebar() {
  var sidebar = document.createElement('div');
  sidebar.innerText = '侧边栏内容';
  dom.append(sidebar);
}

// index.js
var dom = document.getElementById('root');

new Header();
new Sidebar();
new Content();

```

将这些 `js` 在我们的 `html` 中引用一下

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>模块化问题例子</title>
</head>
<body>
  <p>网页内容</p>
  <div id='root'></div>
  <script src='./header.js'></script>
  <script src='./sidebar.js'></script>
  <script src='./content.js'></script>
  <script src='./index.js'></script>
</body>
</html>
```

页面如图所示：

![例子](./img/1.png)



但是到这里我们会发现几个问题，一个是当我们在 `index.js` 文件中使用 `Header` 等组件的时候，我们不知道这个构造函数定义在哪一个文件里面，还是要回到 `html` 中去查看；另外一个问题就是我们不能随意修改`index.html` 文件中 `js` 的引用顺序，比如我们将 `index.js` 放在 `content.js` 之前的时候，页面就会出现这样的报错。



这个就是我们最初提到的项目没有模块化的一些问题，项目一大，依赖会越来越难以管理，也不能随意更改以来的顺序。



这里我们就会想到如果在 `index.js` 中可以这样引用模块，问题就基本上解决了：

```javascript
// ES Moudule 模块引入方式
import Header from './header.js';
import Sidebar from './sidebar.js';
import Content from './content.js';

new Header();
new Sidebar();
new Content();
```

我们既能在 这个文件中知道 依赖的文件地址，并且这里面的顺序调换也不会影响到我们程序的运行，但是很遗憾，这段代码无法直接在浏览器上面直接运行。



所以在这里我们就需要用到 `webpack`



我们在项目根目录中运行:

```javascript
npm init // 一路回车到底

npm install webpack webpack-cli -D // 安装 webpack 依赖

npx webpack index.js
```



执行完这些命令之后，项目根目录下会直接生成 一个 `dist` 文件夹，我们修改一下 `index.html` 引入的 `js`，

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>模块化问题例子</title>
</head>
<body>
  <p>网页内容</p>
  <div id='root'></div>
  <script src='./dist/main.js'></script>
</body>
</html>
```



这样页面中就又正常显示了三个内容，如下图所示：

![例子](./img/1.png)



这个就是最最基础的用 `webpack` 打包 `js` 的例子，深入的内容，我们之后会慢慢讲到的。

&nbsp;

&nbsp;

## 相关链接



&nbsp;

## 示例代码

示例代码可以看这里：

- [补充 示例代码](https://github.com/darrell0904/webpack-study-demo/tree/master/chapter0/webpack)