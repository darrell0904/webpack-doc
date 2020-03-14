# Webpack 启动过程分析

## Webpack 入口文件

### 入口文件

无论是通过 `npm scripts` 运行 `webpack`：

* 开发环境：`npm run dev`
* 生产环境：`npm run build`

还是通过 `webpack` 直接运行： 

* `webpack entry.js bundle.js`

**在命令行运行了上述命令后，`npm` 会在命令行中进入 `node_modules/bin` 目录下去查找是否存在 `webpack.sh` 或者 `webpack.cmd` 文件，如果存在，就执行，不存在，就抛出错误。**



我们在 `node_modules` 中我们可以找到 `webpack` 项目的 `package.json` 文件，可以发现有如下配置：

```json
{
  "name": "webpack",
  "version": "4.41.5",
  // ...
  "main": "lib/webpack.js",
  "web": "lib/webpack.web.js",
  "bin": "./bin/webpack.js",
  // ...
}
```

> `npm` 的 `bin` 字段作用：设置了之后 可执行文件 会被链接到当前项目的 `./node_modules/.bin` 中，在本项目中，就可以很方便地利用 `npm` 执行脚本，更多可参考 [npm的package.json字段含义](https://www.bbsmax.com/A/lk5anQE2d1/)。

在函数中引入 `webpack`，那么入口将会是`lib/webpack.js`。而如果在 `shell` 中执行，那么将会走到 `./bin/webpack.js`。

其实 `webpack` 实际的路口文件是 `node_modules/webpack/bin/webpack.js`。

&nbsp;

### 入口文件 `webpack.js` 分析

我们分析一下 `/bin/webpack.js`，文件很简单，主要分为六步，如下图：

![](./img/start_webpack1.png)

1. 这一行代码正常执行返回

```javascript
process.exitCode = 0;
```

`exitCode` 代表错误码，0 的意思就是没有错误，当运行过程中有错误就会去修改相应的错误码。

2. 运行某个命令

```javascript
const runCommand = (command, args) =>{...};
```

通过 `Node.js` 核心模块 [`child_process`](http://nodejs.cn/api/child_process.html) 去运行某个命令，类似执行 `npm run webpack-cli` 这样。

3. 判断某个包是否安装

```javascript
const isInstalled = packageName =>{...};
```

这个方法是判断某个包是否安装

4. 指定 `webpack` 可用的 `CLI`：

```javascript
const CLIs = [
	{
		name: "webpack-cli",
		package: "webpack-cli",
		binName: "webpack-cli",
		alias: "cli",
		installed: isInstalled("webpack-cli"),
		recommended: true,
		url: "https://github.com/webpack/webpack-cli",
		description: "The original webpack full-featured CLI."
	},
	{
		name: "webpack-command",
		package: "webpack-command",
		binName: "webpack-command",
		alias: "command",
		installed: isInstalled("webpack-command"),
		recommended: false,
		url: "https://github.com/webpack-contrib/webpack-command",
		description: "A lightweight, opinionated webpack CLI."
	}
];
```

* `webpack-cli`：`webpack4.0` 之后将 `webpack-cli` 分离了出来，具有 `webpack` 所有的特性和功能。
* `webpack-command`：轻量级的 `webpack-cli`

5. 返回安装的 `CLI` 的个数

```javascript
const installedClis = CLIs.filter(cli => cli.installed);
```

判断上面的两个 `CLI` 是否安装了，并返回安装的 `CLI` 的个数。

6. 根据安装数量进行处理

```javascript
if (installedClis.length === 0){...}
else if(installedClis.length === 1){...}
else{...}.
```

* 当安装个数是 0 的时候，会提示我们需要至少安装一个 `CLI`，他会在命令行中给予一些选择，一步一步引导我们去安装 `CLI`：

```javascript
// ...
// 定义错误提示信息

let notify =
		"One CLI for webpack must be installed. These are recommended choices, delivered as separate packages:";

for (const item of CLIs) {
  if (item.recommended) {
    notify += `\n - ${item.name} (${item.url})\n   ${item.description}`;
  }
}

// ...
// 选择安装包工具

const isYarn = fs.existsSync(path.resolve(process.cwd(), "yarn.lock"));
const packageManager = isYarn ? "yarn" : "npm";
const installOptions = [isYarn ? "add" : "install", "-D"];

// ...

const question = `Do you want to install 'webpack-cli' (yes/no): `;
const questionInterface = readLine.createInterface({
  input: process.stdin,
  output: process.stderr
});

// 询问我们是否安装 webpack-cli
questionInterface.question(question, answer => {
  // ...

  // 运行 安装命令
  runCommand(packageManager, installOptions.concat(packageName))
    .then(() => {
    require(packageName); //eslint-disable-line
  })
    .catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
});
```

* 当安装 `CLI` 个数是 1 个的时候，`webpack` 就会自动去执行这个 `CLI`：

```javascript
const path = require("path");
// 找到 package.json 文件夹
const pkgPath = require.resolve(`${installedClis[0].package}/package.json`);
// 引入 CLI
const pkg = require(pkgPath);
// 执行 bin 中的文件
// 以 webpack-cli 举例子 会执行 其文件中 ./bin/cli.js 文件
require(path.resolve(
  path.dirname(pkgPath),
  pkg.bin[installedClis[0].binName]
));
```

下面我们会具体讲一下 `webpack-cli` 具体做了一些什么事情。

* 当安装 `CLI` 个数是 2 个的时候，会提示我们报错，说只能使用一个 `CLI`，需要移除一个：

![](./img/start_webpack2.png)



### 总结

在执行 `./bin/webpack.js` 文件之后，`webpack` 最终会找到 `webpack-cli`（`webpack-command`）这个 `npm` 包，并且执行 `CLI`。

&nbsp;

## `webpack-cli` 做的事情

&nbsp;

## 相关链接

- [webpack详解](https://segmentfault.com/a/1190000013657042)

&nbsp;

## 示例代码

示例代码可以看这里，具体是在 `node_modules` 中 `webpack` 文件：

- [示例代码](https://github.com/darrell0904/webpack-study-demo/tree/master/chapter4/plugins-demo)

