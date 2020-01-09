# 新语言
Javascript 最初被设计用于一些简单的工作，在用他开发大型应用时会有一些语言缺陷暴露出来。 CSS 只能用静态的语法描述元素的样式，无法像写 Javascript 那样增加逻辑判断与共享变量。为了解决这一些问题，许多新的语言诞生了。



## ES6

ECMAScript6.0（简称ES6）是 Javascript 语言的下一代标准。他在语言层面上为 Javascript 引入了很多新语法和 Api，使得 Javascript 语言可以用来 编写复杂的大型应用程序。例如：

* 规范了模块化，我们上面提过
* Class 语法（可以 告别 prototype，用起来贼爽）
* 用 let 声明代码块内有效的变量，用const声明常量
* 箭头函数
* async 函数 和 Promise
* Set 和 Map 数据结构
* 等等

通过这些属性，可以更加高效的编写代码，并专注于解决问题本身，但是不同的浏览器对于这些特性的支持不一致，这就使得我们必须通过一些工具，将 ES6 代码转化为 浏览器都认识的 ES5代码，[Babel](https://babeljs.io) 是目前解决这个问题的优秀工具。Babel 的插件机制可以让它灵活配置，支持将任何新语法转化为 ES5 的语法。



## Typescript
[TypeScript](https://www.tslang.cn/) 作为 JavaScript 语言的超集，由 Microsoft 开发并开源，它为 JavaScript 添加了可选择的类型标注，大大增强了代码的可读性和可维护性。同时，它提供最新和不断发展的 JavaScript 特性，能让我们建立更健壮的组件。

并且TypeScript 在社区的流行度越来越高，它非常适用于一些大型项目，也非常适用于一些基础库，极大地帮助我们提升了开发效率和体验。因为不同的模块可能由不同的人编写，在对接不同的模块的时候，静态类型检查会在编译阶段找出相应的可能存在的问题。

```typescript
function hello(content: string) {
    return `hello, ${content}`;
}

let content = 'word';
hello(content);
```



## Less/Scss

[Less](http://lesscss.cn/) 是一门 CSS 预处理语言，它扩展了 CSS 语言，增加了变量、Mixin、函数等特性，使 CSS 更易维护和扩展。 Less 可以运行在 Node 或浏览器端。其基本思想就是用和 CSS 相似的编程语言写完后在编译成正常的 CSS 文件。

```less
@base: #f938ab;

.box-shadow(@style, @c) when (iscolor(@c)) {
  -webkit-box-shadow: @style @c;
  box-shadow:         @style @c;
}
.box-shadow(@style, @alpha: 50%) when (isnumber(@alpha)) {
  .box-shadow(@style, rgba(0, 0, 0, @alpha));
}
.box {
  color: saturate(@base, 5%);
  border-color: lighten(@base, 30%);
  div { .box-shadow(0 0 5px, 30%) }
}

```

输出

```css
.box {
  color: #fe33ac;
  border-color: #fdcdea;
}

.box div {
  -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}
```



使用这些新的语言可以提升效率，但是必须将源代码转化成 可以在浏览器环境下运行的代码。