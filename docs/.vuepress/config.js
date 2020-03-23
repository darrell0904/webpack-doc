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
          'chapter0/module',
          'chapter0/frame',
          'chapter0/language',
          'chapter0/build_tools',
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
          'chapter1/supplement.md',
        ]
      },
      {
        title: 'Webpack 高级概念',
        collapsable: true,
        children: [
          ['chapter2/', 'Webpack 高级概念'],
          'chapter2/tree_shaking.md',
          'chapter2/mode.md',
          'chapter2/log.md',
          'chapter2/code_splitting.md',
          'chapter2/split_chunks_plugin.md',
          'chapter2/lazy_loading.md',
          'chapter2/analysis.md',
          'chapter2/css_splitting.md',
          'chapter2/caching.md',
          'chapter2/shimming.md',
          'chapter2/env.md',
        ]
      },
      {
        title: 'Webpack 实战配置案例',
        collapsable: true,
        children: [
          ['chapter3/', 'Webpack 实战配置案例'],
          'chapter3/library.md',
          'chapter3/ssr.md',
          'chapter3/pwa.md',
          'chapter3/typescript.md',
          'chapter3/webpack_dev_server.md',
          'chapter3/esLint.md',
          'chapter3/more_page.md',
        ]
      },
      {
        title: 'Webpack 性能优化',
        collapsable: true,
        children: [
          ['chapter6/', '性能优化 总览'],
          'chapter6/performance.md',
          'chapter6/multi_process.md',
          'chapter6/dllPlugin.md',
        ]
      },
      {
        title: '编写可维护 Webpack 构建配置',
        collapsable: true,
        children: [
          ['chapter7/', '总览'],
          'chapter7/design.md',
          'chapter7/test.md',
          'chapter7/ci.md',
          'chapter7/npm.md',
          'chapter7/standard.md',
        ]
      },
      {
        title: 'Webpack 底层原理',
        collapsable: true,
        children: [
          ['chapter4/', '总览'],
          'chapter4/webpack_debug.md',
          'chapter4/webpack_start.md',
          'chapter4/webpack_tapable.md',
          'chapter4/webpack_process.md',
          'chapter4/writeWebpack.md',
          'chapter4/writeLoader.md',
          'chapter4/writePlugin.md',
        ]
      },
      {
        title: 'React、Vue框架脚手架配置分析',
        collapsable: true,
        children: [
          ['chapter5/', '总览'],
          'chapter5/createReactApp.md',
          'chapter5/vueCli3.md',
        ]
      },
      {
        title: '一些补充',
        collapsable: true,
        children: [
          ['chapter8/', '一些补充'],
          'chapter8/deploy.md',
        ]
      },
    ],
  }
}