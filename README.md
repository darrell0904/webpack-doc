## 安装运行

```nginx
# clone 项目
git clone git@github.com:darrell0904/webpack-doc.git

# 安装依赖
npm install

# 启动项目
npm run dev
```

&nbsp;

## 写文档的原因

因为现在对于 `webpack` 的配置了解的不够全名，比较碎片话，同时有些很新的概念一直都没有应用。

这是我写这个文档原因，让自己更加系统全面的掌握 `webpack` ，毕竟 `webpack 5.0` 快要来了。



> 此篇文档的 `webpack` 的版本是 `4.0`

&nbsp;
## `github` 图片出不来？

* 首先打开 `host` 文件

```nginx
sudo vi /etc/hosts
```

* 接着添加以下内容

```nginx
# GitHub Start

192.30.253.112    github.com
192.30.253.119    gist.github.com
199.232.28.133    assets-cdn.github.com
199.232.28.133    raw.githubusercontent.com
199.232.28.133    gist.githubusercontent.com
199.232.28.133    cloud.githubusercontent.com
199.232.28.133    camo.githubusercontent.com
199.232.28.133    avatars0.githubusercontent.com
199.232.28.133    avatars1.githubusercontent.com
199.232.28.133    avatars2.githubusercontent.com
199.232.28.133    avatars3.githubusercontent.com
199.232.28.133    avatars4.githubusercontent.com
199.232.28.133    avatars5.githubusercontent.com
199.232.28.133    avatars6.githubusercontent.com
199.232.28.133    avatars7.githubusercontent.com
199.232.28.133    avatars8.githubusercontent.com

# GitHub End
```

* 保存，退出，重新刷新 `github` 页面



> 具体原因大家可以参考这篇文章：[解决github图片不显示的问题](https://blog.csdn.net/qq_38232598/article/details/91346392)



## 项目截图

![](./images/webpack1.png)

![](./images/webpack2.png)


&nbsp;

## 项目系列文章



### 初识 `webpack`

* [前端的发展](https://github.com/darrell0904/webpack-doc/blob/master/docs/chapter0/README.md)
* [新框架](https://github.com/darrell0904/webpack-doc/blob/master/docs/chapter0/frame.md)
* [新语言](https://github.com/darrell0904/webpack-doc/blob/master/docs/chapter0/language.md)
* [常见的构建工具及对比](https://github.com/darrell0904/webpack-doc/blob/master/docs/chapter0/install.md)
* [安装webpack](https://github.com/darrell0904/webpack-doc/blob/master/docs/chapter0/start.md)
* [一些补充](https://github.com/darrell0904/webpack-doc/blob/master/docs/chapter0/supplement.md)

### Webpack 核心概念

* [Webpack 的配置参数](https://github.com/darrell0904/webpack-doc/blob/master/docs/chapter1/README.md)
* [配置 entry 和 output](https://github.com/darrell0904/webpack-doc/blob/master/docs/chapter1/entry_output.md)
* [配置 loader](https://github.com/darrell0904/webpack-doc/blob/master/docs/chapter1/loaders.md)
* [配置 plugin](https://github.com/darrell0904/webpack-doc/blob/master/docs/chapter1/plugins.md)
* [配置 sourceMap](https://github.com/darrell0904/webpack-doc/blob/master/docs/chapter1/sourcemap.md)