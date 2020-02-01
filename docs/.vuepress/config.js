module.exports = {
  dest: 'dist',
  title: 'Hello Webpack',
  themeConfig: {
    editLinks: false,
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'master',
    // 定制文章标题颜色
    nav: [
      { text: 'Home', link: '/' },
    ],
    sidebar: [
      {
        title: '初识 Webpack',
        collapsable: true,
        children: [
          ['chapter0/', '前端的发展'],
          'chapter0/frame',
          'chapter0/language',
          'chapter0/install',
          'chapter0/start',
          'chapter0/supplement',
        ]
      },
      {
        title: 'Webpack 核心概念',
        collapsable: true,
        children: [
          ['chapter1/', 'Webpack 配置'],
          'chapter1/entry_output.md',
          'chapter1/loaders.md',
          'chapter1/plugins.md',
          'chapter1/sourcemap.md',
          'chapter1/webpack_dev_server.md',
          'chapter1/hot_module_replacement.md',
          'chapter1/webpack_babel.md',
          'chapter1/webapck_react.md',
        ]
      },
      {
        title: 'Webpack 高级概念',
        collapsable: true,
        children: [
          ['chapter2/', 'Webpack 高级概念'],
          'chapter2/tree_shaking.md',
          'chapter2/mode.md',
          'chapter2/code_splitting.md',
          'chapter2/split_chunks_plugin.md',
          'chapter2/lazy_loading.md',
          'chapter2/analysis.md',
          'chapter2/css_splitting.md',
          'chapter2/caching.md',
          'chapter2/shimming.md',
          'chapter2/split_chunks_plugin.md',
          'chapter2/env.md',
        ]
      },
      {
        title: 'Webpack 实战配置案例',
        collapsable: true,
        children: [
          ['chapter3/', 'Webpack 实战配置案例'],
          'chapter3/library.md',
          'chapter3/pwd.md',
          'chapter3/typescript.md',
          'chapter3/webpack_dev_server.md',
          'chapter3/esLint.md',
          'chapter3/performance.md',
          'chapter3/more_page.md',
        ]
      },
    ],
  }
}