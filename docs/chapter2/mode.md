# Develoment 和 Production 模式的区分打包

## 为什么要区分打包。

因为有的时候我们 **开发环境** 和 **生产环境** 的打包所要做的事情是不同的。

比如在 **开发环境** 中我们需要 `webpack-dev-server` 来帮我们进行快速的开发，同时需要 **HMR** 热更新帮我们进行页面的无刷新改动。而这些在我们的 **生产环境** 中都是不需要的。

&nbsp;

## 思路

其实很简单我们就新建两个 `webpack` 的配置文件就行：

* `webpack.dev.js`：开发环境的配置文件
* `webpack.prod.js`：生产环境的配置文件

我们可以通过 `webpack-merge` 来整合两个配置文件共同的配置 `webpack.common.js`

&nbsp;

##  具体操作

* 首先在根目录创建一个 `config` 目录，用来存放相关的配置文件

* 接着完善两个生产环境的配置文件

  `webpack.dev.js`

```javascript
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', // development
  devServer: {
    contentBase: './dist',
    open: true,
    port: 3002,
    hot: true
  },
  entry: './src/index.js',
  module: {
    rules: [{
      test: /\.(png|jpg|gif)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name]_[hash].[ext]',
          outputPath: 'images/',
        }
      }
    }, {
      test: /\.(eot|ttf|svg|woff|woff2)$/,
      use: {
        loader: 'file-loader',
      }
    }, {
      test: /\.less$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            // modules: true,
          }
        },
        'less-loader',
        'postcss-loader',
      ]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../dist')
  }
}
```

​		`webpack.pro.js`：在此配置文件中 `devtool` 需要更改一下，同时这里我们不需要 `webpack-dev-server` 了

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map', // production
  entry: './src/index.js',
  module: {
    rules: [{
      test: /\.(png|jpg|gif)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name]_[hash].[ext]',
          outputPath: 'images/',
        }
      }
    }, {
      test: /\.(eot|ttf|svg|woff|woff2)$/,
      use: {
        loader: 'file-loader',
      }
    }, {
      test: /\.less$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            // modules: true,
          }
        },
        'less-loader',
        'postcss-loader',
      ]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../dist')
  }
}
```

​    接着修改一下 `package.json` 文件的 `script` 字段：

```json
"scripts": {
  "dev": "webpack-dev-server --config ./config/webpack.dev.js",
  "build": "webpack --config ./config/webpack.prod.js"
},
```



* 接着我们提取一下公共的配置，并放到 `webpack.common.js` 中：

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [{
      test: /\.(png|jpg|gif)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name]_[hash].[ext]',
          outputPath: 'images/',
        }
      }
    }, {
      test: /\.(eot|ttf|svg|woff|woff2)$/,
      use: {
        loader: 'file-loader',
      }
    }, {
      test: /\.less$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            modules: true,
          }
        },
        'less-loader',
        'postcss-loader',
      ]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../dist')
  }
}
```

接着修改一下 `webpack.dev.js` 和 `webpack.pro.js` 如下：

```javascript
// webpack.dev.js
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', // development
  devServer: {
    contentBase: './dist',
    open: true,
    port: 3002,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
}

module.exports = merge(commonConfig, devConfig);


// webpack.pro.js

const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map', // production
}

module.exports = merge(commonConfig, prodConfig);
```



* 最后我们可以执行命令进行操作：
  * `npm run dev`：开发环境打包
  * `npm run build`：生产环境打包

&nbsp;

## 相关链接

&nbsp;

## 示例代码

示例代码可以看这里：

* [Develoment 和 Production 模式的区分打包 实例代码](https://github.com/darrell0904/webpack-study-demo/tree/master/chapter2/webpack-build-mode)

