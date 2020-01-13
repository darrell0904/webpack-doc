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
        collapsable: false,
        children: [
          ['chapter1/', 'Webpack 配置'],
          'chapter1/loaders.md',
          'chapter1/plugins.md',
        ]
      },
    ],
  }
}