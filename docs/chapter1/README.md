# Webpack 入门

近年来Web 应用 变得更加复杂 与庞大，Web 前端技术 的应用范围也更加广泛。HTML 开发 Web 应用的方式已经无法应对当前的 Web 应用的发展。所以前端社区陆续涌现出了许多新思想与框架，下面将一一介绍。

## 模块化

模块化是指将一个复杂的系统分解为多个模块以方便编码。

因为之前写代码，开发网页的时候需要通过命名空间来组织代码，比如 `JQuery` 会讲它的所有 `Api` 都挂在 `window.$` 下，在加载完 `JQuery` 之后，其他模块 再通过 `window.$` 去使用 `JQuery`。这样便会出现很多问题：

- 命名空间产生冲突，两个库可能会使用同一个名称

- 无法合理的管理项目的依赖和版本

- 无法方便的控制依赖的加载顺序

当项目变得越来越大的时候，这种方式会变得难以维护，所以在这里需要用模块化的思想来组织代码。

### CommonJS
`CommonJs` 是一种被广泛使用的 `JavaScript` 模块化 规范，其核心思想是通过 `require` 方法来同步加载依赖的其他模块，通过 `module.exports` 导出需要暴露的接口。它的流行得益于 `Node.js` 采用了这种方式，后来这种方式就被引入到了 网页开发之中。

采用 `CommonJs` 倒入及导出的代码如下：
```javascript
// 导入
const moduleA = require('./moduleA');

// 导出
module.exports = moduleA.someFunc;
```

优点：
- 代码可复用于 `Node.js` 环境下并运行，例如做同构应用
- 通过 Npm 发布的很多第三方模块都采用了 此规范

缺点：
- 代码无法直接运行在浏览器环境之下，必须通过一些工具转化为浏览器能运行的 `ES5`


### AMD
`AMD` 也是一种 `JavaScript` 模块化规范，与 `CommonJS` 最大的不同在于，他采用了异步的方式去加载依赖的模块。它主要解决针对浏览器环境的模块化问题，最具代表性的实现是 `require.js`

采用 `AMD` 导入及导出的代码如下：
```javascript
// 定义一个模块
define('module', ['dep'], function(dep) {
  return exports;
})

// 导入和使用
require(['module'], function(module){

})
```

优点：
- 可以直接在浏览器中运行
- 可以异步加载依赖
- 可并行加载多个依赖
- 代码可以运行在 浏览器环境和 `Node.js` 环境下

缺点：
- `Javascript` 运行环境没有原生支持 `AMD`，需要先导入实现了 `AMD` 的库后才能正常使用

### ES6 模块化
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


## 新框架

在 `web` 应用变得庞大、复杂时，采用直接操作 DOM 的方式去开发会使代码变得复杂和难以维护，许多新的思想被引入到了网页开发中以减少开发难度和提升开发效率。

### React

### Vue

### Angular2


## 新语言
Javascript 最初被设计用于一些简单的工作，在用他开发大型应用时会有一些语言缺陷暴露出来。 CSS 只能用静态的语法描述元素的样式，无法像写 Javascript 那样增加逻辑判断与共享变量。为了解决这一些问题，许多新的语言诞生了。

### ES6

### Typescript

### Scss/Less

                                                                          

