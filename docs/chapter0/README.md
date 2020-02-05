# 模块化

> 最近几年 `Web` 应用发展的速度实在是太快了，很多在后端完成工作都慢慢的跑到了前端，渐渐的 Web 应用变得越来越复杂与庞大。单单靠HTML 开发 Web 的方式已经无法满足和适应当前的 Web 应用的发展。陆续便有一些新的思想和框架涌现出来了。下面将从**前端模块化**、**三大框架**、**新语言**三个角度来讲讲 Webpack 由来的背景



**模块化是指将一个复杂的系统分解为多个模块以方便编码。**



因为之前写代码，开发网页的时候需要通过命名空间来组织代码，比如 `JQuery` 会讲它的所有 `Api` 都挂在 `window.$` 下，在加载完 `JQuery` 之后，其他模块 再通过 `window.$` 去使用 `JQuery`。这样便会出现很多问题：

- 命名空间产生冲突，两个库可能会使用同一个名称

- 无法合理的管理项目的依赖和版本

- 无法方便的控制依赖的加载顺序

当项目变得越来越大的时候，这种方式会变得难以维护，所以在这里需要用模块化的思想来组织代码。目前流行的  前端模块化规范有 `CommonJs`、`AMD`、`CMD`、`ES6`。



## CommonJS

`CommonJs` 是一种被广泛使用的 `JavaScript` 模块化规范，其核心思想是通过 `require` 方法来同步加载依赖的其他模块，通过 `module.exports` 导出需要暴露的接口。它的流行得益于 `Node.js` 采用了这种方式，后来这种方式就被引入到了 网页开发之中。

采用 `CommonJs` 导入及导出的代码如下：
```javascript
// 定义模块 demo.js
var num1 = 0;
function add(a, b) {
  return a + b;
}

// 暴露向外提供的函数或者变量

module.exports = {
  add: add,
  num1: num1,
}

// 导入自定义的模块时，参数包含路径，可省略.js
const moduleA = require('./demo');
moduleA.add(2, 1); // 3

// 在 node 中，引用其核心模块，则不需要带路径
var fs = require('fs');
var data = fs.readFileSync('./demo.js');
```



**特点**

commonJS用同步的方式加载模块，在服务端，模块文件都存在本地磁盘，读取很快，但在浏览器端因为网络等原因，最好的方式应该需要进行异步加载；因为是同步加载，所以只有加载完成，才能执行后面的操作；在服务器端，模块的加载是运行时直接可以运行的；在浏览器端，模块需要提前编译打包处理。



**机制**

`CommonJS ` 模块的加载机制是，输入的是被输出的值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。下面是相关例子：

```javascript
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}

module.exports = {
  counter: counter,
  incCounter: incCounter,
};
```



上面代码输出内部变量 `counter`和改写这个变量的内部方法 `incCounter`。

```javascript
// main.js
var mod = require('./lib');

console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3
```



上面的代码说明，`lib.js` 模块加载完了之后，它的内部变化就影响不到输出的 `mod.counter` 了。这是因为 `mod.counter` 是一个原始类型的值，会被缓存。除非写成一个函数，才能得到内部变动后的值。



```javascript
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}

module.exports = {
  get counter() {
    return counter
  },
  incCounter: incCounter,
};
```



上面的代码中，输出的 counter 属性是一个取值器函数。现在在执行 `main.js`，就可以正确的读出 变量 counter 的值了。

```javascript
$ node main.js
3
4
```



## AMD
`AMD` 也是一种 `JavaScript` 模块化规范，与 `CommonJS` 最大的不同在于，他采用了异步的方式去加载依赖的模块。它主要解决针对浏览器环境的模块化问题，因为浏览器环境有可能会因为网络的原因，需要从服务器加载数据，那么这里就需要采用非同步的模式。最具代表性的实现是 `require.js`。



采用 `AMD` 导入及导出的代码如下（使用`require.js`）：
```javascript
// 定义没有依赖的模块
define(function(){
  return 模块
})

// 定义有依赖的模块
define(['module1', 'module2'], function(m1, m2){
  return 模块
})

// 引入使用模块
require(['module1', 'module2'], function(m1, m2){
  // 使用m1、m2
})
```



**特点**

可以直接在浏览器中运行，可以异步加载依赖，并可以同时加载多个依赖，避免页面失去响应；定义模块的方法很清晰，不会污染全局环境，能够清晰的显示依赖关系。但是`Javascript` 运行环境没有原生支持 `AMD`，需要先导入实现了 `AMD` 的库后才能正常使用。



## CMD

`CMD`规范专门用于浏览器端，模块的加载是异步的，**模块使用时才会加载执行**。它整合了 `CommonJS`和`AMD`规范的特点最具代表性的是 [`Sea.js`](https://github.com/seajs/seajs)。

采用 `CMD` 导入及导出的代码如下：

导入导出代码：

```javascript
//定义没有依赖的模块
define(function(require, exports, module){
  exports.xxx = value
  module.exports = value
})

//定义有依赖的模块
define(function(require, exports, module){
  //引入依赖模块(同步)
  var module2 = require('./module2')
  //引入依赖模块(异步)
  require.async('./module3', function (m3) {
  })
  //暴露模块
  exports.xxx = value
})

// 引入使用模块：
define(function (require) {
  var m1 = require('./module1')
  var m4 = require('./module4')
  m1.show()
  m4.show()
})

```



## ES6 模块化
`ES6` 模块化是国际标准化组织 `ECMA` 提出的 `JavaScript` 模块化 规范，它在语言层面上实现了模块化。浏览器厂商和 `Node.js` 都说要原生支持该规范。他将取代 `CommonJs` 和 `Amd` 规范，成为浏览器和服务器通用的模块解决方案。

采用`ES6` 模块化导入及导出的代码如下：
```javascript
// 导入
import { readFile } from 'fs';
import React from 'react';

// 导出
export function hello() {};
export default {
  // ...
}
```

缺点：
- 代码无法直接运行在 大部分的 `Javascript` 运行环境之下，必须通过一些工具转化为浏览器能运行的 `ES5`


## ES6 与 CommonJs的差异

* CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。

  > CommonJs 在上文中已经进行分析过，ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令 `import`，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

* CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

  > 因为 CommonJS 加载的是一个对象（即`module.exports`属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。



针对第一条，还是用介绍CommonJs的代码：

```javascript
// lib.js
export let counter = 3;
export function incCounter() {
  counter++;
}

// main.js
import { counter, incCounter } from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4
```

这里面便解释了 第一条，es6的模块输出机制，输出的counter是会变得。



## 相关链接

* [阮一峰——Module 的加载实现](http://es6.ruanyifeng.com/#docs/module-loader)

* [前端模块化：CommonJS，AMD，CMD，ES6](https://juejin.im/post/5aaa37c8f265da23945f365c)

* [前端模块化详解(完整版)](https://juejin.im/post/5c17ad756fb9a049ff4e0a62)



## 示例代码

示例代码可以看这里：

* [模块化 示例代码](https://github.com/darrell0904/webpack-study-demo/tree/master/chapter0)

