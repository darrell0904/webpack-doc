# 新框架

在 `web` 应用变得庞大、复杂时，采用直接操作 DOM 的方式去开发会使代码变得复杂和难以维护，许多新的思想被引入到了网页开发中以减少开发难度和提升开发效率，众所周知，前端三大框架React、Vue、Angular成三足鼎立之势。

## React
React 框架引入了 JSX 语法到 Javascript 语言层面中，可以更加灵活的控制视图的渲染逻辑。

```react
let has = true;

render(has ? <div>hello, react</div> : <div>404 not found</div>)
```



但是这个语法无法直接在任何现成的 Javascript 引擎中运行，必须经过转换。



## Vue

Vue 框架是以`.vue` 结尾的文件，这个文件里面包括了 组件相关的 HTML 模版、Javascript 逻辑代码、css样式代码，这非常直观。



```vue
<template>
	<!-- HTML 模版 -->
	<div class="example">
        {{msg}}
    </div>
	<!-- Javascript 逻辑 -->
	<script>
        export default {
            data () {
                return {
                    msg: 'Hello world!'
                }
            }
        }
    </script>
	<!-- css样式 -->
	<style>
        .example {
            font-weight: bold;
        }
    </style>
</template>
```



显而易见，这个语法无法直接在任何现成的 Javascript 引擎中运行，必须经过转换。



## Angular2

Angular2是由 Typescript 语言开发的，并且可以通过各种注解的语法来描述组建的各种属性，但是笔者没有怎么使用过，这里就不做介绍了。



